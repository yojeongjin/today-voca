import express from 'express';
import next from 'next';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// custom middlewares
import { LoggerMiddleware } from './back/middleware/loggerMiddleware';
import { globalExceptionHandler } from './back/middleware/globalExceptionHandler';

// routers
import indexRouter from './routes/index';
import usersRouter from './routes/users';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();

  // Middlewares
  app.use(LoggerMiddleware);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(cors());
  app.use(express.static(path.join(__dirname, 'public')));

  // API routes
  app.use('/', indexRouter);
  app.use('/users', usersRouter);

  // Next.js 페이지 핸들링
  app.all('*', (req, res) => handle(req, res));

  app.use(globalExceptionHandler);

  const PORT = parseInt(process.env.PORT || '3000', 10);
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
});
