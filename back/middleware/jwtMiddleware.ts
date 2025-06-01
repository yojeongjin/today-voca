import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from '../class/CustomError';
import { HttpStatus } from '../enum/HttpStatus.enum';
import { ErrorCode } from '../enum/ErrorCode.enum';

declare global {
  namespace Express {
    interface Request {
      verifiedToken?: string | jwt.JwtPayload;
    }
  }
}

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) {
    throw new CustomError(
      HttpStatus.UNAUTHORIZED,
      '로그인 되어있지 않습니다.',
      ErrorCode.UNAUTHORIZED_ACCESS,
    );
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_KEY as string);
    req.verifiedToken = verifiedToken;

    next();
  } catch (err) {
    // 토큰 검증 실패 처리
    throw new CustomError(
      HttpStatus.FORBIDDEN,
      '유효하지 않은 토큰입니다.',
      ErrorCode.FORBIDDEN_ACCESS,
    );
  }
};
