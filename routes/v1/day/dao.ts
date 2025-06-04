import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../../../back/enum/HttpStatus.enum';
import { successResponse } from '../../../back/utils/apiResponse';

// db
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import getPool from '../../../config/db';
const pool = getPool();

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { day, day_size, level } = req.query;

  const pageValue = Number(day) || 1;
  const pageSizeValue = Number(day_size) || 10;
  const offset = (pageValue - 1) * pageSizeValue;

  try {
    const sql = `SELECT tw.*
                FROM tbl_word as tw
                LEFT JOIN tbl_plan as tp on tp.level = tw.level
                WHERE tw.level = ?
                ORDER BY tw.id ASC 
                LIMIT ${pageSizeValue} OFFSET ${offset}
                `;
    const [rows] = await pool.execute<RowDataPacket[]>(sql, [level]);

    res.status(HttpStatus.OK).json(
      successResponse({
        data: rows,
      }),
    );
  } catch (err) {
    next(err);
  }
};

export const modify = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = (req.verifiedToken as any).user_idx;
  const { state } = req.body;

  try {
    const daySql = `update tbl_daily set state = ? where idUser = ?`;
    const [dayResult] = await pool.execute<ResultSetHeader>(daySql, [state, user_id]);

    // day_id
    const planId = dayResult.insertId;

    const historySql = `insert into tbl_daily_history step_name = ?`;

    res.status(HttpStatus.OK).json(successResponse());
  } catch (err) {
    next(err);
  }
};
