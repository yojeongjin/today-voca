import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../../../back/enum/HttpStatus.enum';
import { successResponse } from '../../../back/utils/apiResponse';

// db
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import getPool from '../../../config/db';
const pool = getPool();

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = (req.verifiedToken as any).user_idx;

  try {
    const sql = 'select * from tbl_plan where user_id = ?';
    const [rows] = await pool.execute<RowDataPacket[]>(sql, [user_id]);

    res.status(HttpStatus.OK).json(
      successResponse({
        data: rows,
      }),
    );
  } catch (err) {
    next(err);
  }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = (req.verifiedToken as any).user_idx;
  const { title, startDate, endDate, total_date, level, emoji } = req.body;

  try {
    const sql =
      'insert into tbl_plan (title, plan_from, plan_to, total_date, level, emoji, user_id ) values (?, ?, ?, ?, ?, ?, ?)';
    await pool.execute<ResultSetHeader>(sql, [
      title,
      startDate,
      endDate,
      total_date,
      level,
      emoji,
      user_id,
    ]);

    res.status(HttpStatus.OK).json(successResponse());
  } catch (err) {
    next(err);
  }
};
