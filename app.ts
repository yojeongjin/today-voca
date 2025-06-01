import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
//middleware
import { LoggerMiddleware } from './back/middleware/loggerMiddleware';
import { globalExceptionHandler } from './back/middleware/globalExceptionHandler';
// router
import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

// 로그 미들웨어 적용
app.use(LoggerMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(cors());
app.use(
  cors({
    origin: 'http://localhost:8000', // 프론트엔드 주소 (정확하게 지정해야 함)
    credentials: true, // 쿠키, 세션 등 포함 가능하게
  }),
);

app.use(express.static(path.join(__dirname, 'public')));
// 라우터
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 모든 예외 처리
app.use(globalExceptionHandler);

export default app;
