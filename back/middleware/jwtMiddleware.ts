import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
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

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_KEY as string);
    req.verifiedToken = verifiedToken;

    next();
  } catch (err: any) {
    console.log('JWT Error:', err);
    if (err instanceof TokenExpiredError) {
      throw new CustomError(
        HttpStatus.UNAUTHORIZED,
        'Access Token이 만료되었습니다.',
        ErrorCode.EXPIRED_ACCESS_TOKEN,
      );
    }
    // 토큰 검증 실패 처리
    throw new CustomError(
      HttpStatus.FORBIDDEN,
      '유효하지 않은 토큰입니다.',
      ErrorCode.FORBIDDEN_ACCESS,
    );
  }
};
