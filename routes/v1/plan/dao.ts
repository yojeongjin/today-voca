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
    const sql = `SELECT tp.*, td.day_number FROM tbl_plan as tp
                  LEFT JOIN tbl_user as tu on tu.id = tp.user_id
                  LEFT JOIN tbl_daily as td on tp.id = td.plan_id
                  WHERE tp.user_id = ? AND tp.state = 'PENDING'
                  `;
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
  const { title, plan_from, plan_to, total_date, level, emoji } = req.body;

  try {
    // 1) tbl_plan에 새 플랜 넣기
    const planSql =
      'INSERT INTO tbl_plan (title, plan_from, plan_to, total_date, level, emoji, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [planResult] = await pool.execute<ResultSetHeader>(planSql, [
      title,
      plan_from,
      plan_to,
      total_date,
      level,
      emoji,
      user_id,
    ]);

    // 플랜 id
    const planId = planResult.insertId; // 방금 생성된 plan의 PK

    // 2) tbl_daily에 plan_id를 사용해 한 줄 추가
    const dailySql = 'INSERT INTO tbl_daily (plan_id) VALUES (?)';
    await pool.execute(dailySql, [planId]);

    res.status(HttpStatus.OK).json(successResponse());
  } catch (err) {
    next(err);
  }
};
