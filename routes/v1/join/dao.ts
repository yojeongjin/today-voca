import { Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import redisClient from '../../../config/redisClient';
import { CustomError } from '../../../back/class/CustomError';
import { HttpStatus } from '../../../back/enum/HttpStatus.enum';
import { ErrorCode } from '../../../back/enum/ErrorCode.enum';
import { successResponse } from '../../../back/utils/apiResponse';

// db
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import getPool from '../../../config/db';
const pool = getPool();

// 인증번호 생성
const generateAuthCode = (): string => {
  return String(Math.floor(Math.random() * 100000)).padStart(5, '0');
};

// 메일 transporter 생성
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    host: 'smtp.gmail.com',
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
};

// 메일 옵션 생성
const createMailOptions = (email: any, authCode: string) => ({
  from: process.env.GMAIL_ADDRESS,
  to: email,
  subject: '콩글리시 회원가입 인증메일입니다.',
  html: `
    <p>계정 보안을 위해 2차 인증이 필요합니다. 아래 인증 코드를 입력하여 회원가입 절차를 완료해주세요.</p>
    <br />
    <p><strong>인증번호: ${authCode}</strong></p>
    <br />
    인증이 완료되지 않은 경우 새로운 인증코드를 발급받으시기 바랍니다.</p>
  `,
});

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.query;

  try {
    // DB에서 유저 존재 여부 확인
    const sql = 'SELECT * FROM tbl_user WHERE email = ?';
    const [rows] = await pool.execute<RowDataPacket[]>(sql, [email]);

    if (rows.length > 0) {
      throw new CustomError(
        HttpStatus.FORBIDDEN,
        `이미 사용 중인 이메일(아이디)입니다.\n기존 계정으로 로그인 해주세요.`,
        ErrorCode.INVALID_REQUEST,
      );
    }

    // 인증번호
    const authCode = generateAuthCode();
    // redis 저장
    await redisClient.setEx(`verify:${email}`, 180, authCode);

    // 메일 발송
    const transporter = createTransporter();
    const mailOptions = createMailOptions(email, authCode);

    transporter.sendMail(mailOptions, err => {
      if (err) {
        throw new CustomError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `메일 전송에 실패하였습니다.\n다시 시도해주세요.`,
          ErrorCode.INTERNAL_ERROR,
        );
      }

      res.status(HttpStatus.OK).json(successResponse());
    });
  } catch (err) {
    next(err);
  }
};

export const verify = async (req: Request, res: Response, next: NextFunction) => {
  const { email, authCode } = req.body;

  try {
    // redis에서 코드 받아오기
    const savedCode = await redisClient.get(`verify:${email}`);

    if (!savedCode) {
      res.status(400).send({
        success: false,
        msg: '인증시간이 초과하였습니다.',
      });
    }

    if (savedCode !== authCode) {
      res.status(400).send({
        success: false,
        msg: '유효하지않은 인증번호입니다.',
      });
    }
    // 코드 지우기
    await redisClient.del(`verify:${email}`);

    res.status(HttpStatus.OK).json(successResponse());
  } catch (err) {
    next(err);
  }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, pwd } = req.body;

  try {
    const hashedPwd = await bcrypt.hash(pwd, 12);

    const sql = 'insert into tbl_user (nickname, email, pwd) values (?, ?, ?)';
    await pool.execute<ResultSetHeader>(sql, [name, email, hashedPwd]);

    res.status(HttpStatus.OK).json(successResponse());
  } catch (err) {
    next(err);
  }
};
