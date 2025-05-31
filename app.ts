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
// db
import { init, connect } from './config/db';

const app = express();
// db 연결
const conn = init();
connect(conn);

// 로그 미들웨어 적용
app.use(LoggerMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// 라우터
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 모든 예외 처리
app.use(globalExceptionHandler);

export default app;
