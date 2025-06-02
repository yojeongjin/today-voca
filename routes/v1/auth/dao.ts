import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../../back/class/CustomError';
import { HttpStatus } from '../../../back/enum/HttpStatus.enum';
import { ErrorCode } from '../../../back/enum/ErrorCode.enum';
import { successResponse } from '../../../back/utils/apiResponse';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// db
import { RowDataPacket } from 'mysql2';
import getPool from '../../../config/db';
const pool = getPool();

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, pwd } = req.body;

  try {
    const sql = 'select * from tbl_user where email = ?';

    const [result] = await pool.execute<RowDataPacket[]>(sql, [email]);

    if (result.length === 0) {
      throw new CustomError(
        HttpStatus.FORBIDDEN,
        `회원정보가 존재하지 않습니다.`,
        ErrorCode.FORBIDDEN_ACCESS,
      );
    }

    // 비밀번호 비교
    const user = result[0];
    const userPwd = pwd as string;
    const isPwd = await bcrypt.compare(userPwd, user.pwd.replace(/\{bcrypt\}/gi, ''));

    if (!isPwd) {
      throw new CustomError(
        HttpStatus.FORBIDDEN,
        `비밀번호가 일치하지 않습니다.\n다시 시도해주세요.`,
        ErrorCode.INVALID_REQUEST,
      );
    }
    // Access & Refresh Token 생성
    const accessToken = jwt.sign(
      {
        user_idx: user.id,
        user_name: user.nickname,
      },
      process.env.JWT_KEY as string,
      { expiresIn: '1h' },
    );

    const refreshToken = jwt.sign({ user_idx: user.id }, process.env.REFRESH_JWT_KEY as string, {
      expiresIn: '14d',
    });

    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60, // 1시간
      })
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 14, // 14일
      });

    res.status(HttpStatus.OK).json(successResponse());
  } catch (err) {
    next(err);
  }
};

export const refreshAccessToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      throw new CustomError(
        HttpStatus.UNAUTHORIZED,
        'Refresh token이 없습니다.',
        ErrorCode.UNAUTHORIZED_ACCESS,
      );
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_KEY as string,
    ) as jwt.JwtPayload;

    const newAccessToken = jwt.sign(
      {
        user_idx: decoded.user_idx,
        user_name: decoded.user_name,
      },
      process.env.JWT_KEY as string,
      { expiresIn: '1h' },
    );

    // res.cookie('access_token', newAccessToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'strict',
    //   maxAge: 1000 * 60 * 60, // 1시간
    // });

    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      domain: 'http://172.30.1.26',
    });

    res.status(200).json(successResponse());
  } catch (err) {
    next(err);
  }
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.verifiedToken as any;

    if (!token?.user_idx || !token?.user_name) {
      throw new CustomError(
        HttpStatus.UNAUTHORIZED,
        '유효하지 않은 사용자입니다.',
        ErrorCode.UNAUTHORIZED_ACCESS,
      );
    }

    res.status(200).json(
      successResponse({
        user_idx: token.user_idx,
        user_name: token.user_name,
      }),
    );
  } catch (err) {
    next(err);
  }
};
