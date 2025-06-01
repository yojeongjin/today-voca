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
    const r = /\{bcrypt\}/gi;
    const userPwd = pwd as string;
    const isPwd = await bcrypt.compare(userPwd, result[0].pwd.replace(r, ''));

    if (isPwd) {
      const jwtKey = process.env.JWT_KEY as string;
      const token = jwt.sign(
        {
          userIdx: result[0].id,
          userName: result[0].nickname,
        },
        jwtKey,
      );
      res.status(HttpStatus.OK).json(
        successResponse({
          token: token,
        }),
      );
    } else {
      throw new CustomError(
        HttpStatus.FORBIDDEN,
        `비밀번호가 일치하지 않습니다.\n다시 시도해주세요.`,
        ErrorCode.INVALID_REQUEST,
      );
    }
  } catch (err) {
    next(err);
  }
};
