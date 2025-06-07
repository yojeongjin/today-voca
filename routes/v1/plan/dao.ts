import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../../../back/enum/HttpStatus.enum';
import { successResponse } from '../../../back/utils/apiResponse';
import { CustomError } from '../../../back/class/CustomError';
import { ErrorCode } from '../../../back/enum/ErrorCode.enum';
// db
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import getPool from '../../../config/db';

const pool = getPool();

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = (req.verifiedToken as any).user_idx;

  try {
    const sql = `
      SELECT 
        tp.*,
        td.day_number,
        td.state AS daily_state,
        td.current_step
      FROM tbl_plan AS tp
      LEFT JOIN tbl_daily AS td ON td.plan_id = tp.id
      WHERE tp.user_id = ? and tp.state = 'PROGRESS'
      ORDER BY tp.id DESC, td.day_number ASC
    `;

    const [rows] = await pool.execute<RowDataPacket[]>(sql, [user_id]);

    const planMap = new Map<number, any>();

    rows.forEach(row => {
      const planId = row.id;

      if (!planMap.has(planId)) {
        planMap.set(planId, {
          plan_id: row.id,
          title: row.title,
          plan_from: row.plan_from,
          plan_to: row.plan_to,
          total_date: row.total_date,
          level: row.level,
          state: row.state,
          emoji: row.emoji,
          length: row.length,
          daily_list: [],
        });
      }

      // daily 정보가 존재할 때만 push
      if (row.day_number !== null) {
        planMap.get(planId).daily_list.push({
          day_number: row.day_number,
          daily_state: row.daily_state,
          current_step: row.current_step,
        });
      }
    });

    const result = Array.from(planMap.values());
    res.status(200).json(successResponse({ data: result }));
  } catch (err) {
    next(err);
  }
};

export const all = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = (req.verifiedToken as any).user_idx;

  try {
    const sql = `
      SELECT * FROM tbl_plan
      WHERE user_id = ? order by id desc;`;

    const [rows] = await pool.execute(sql, [user_id]);

    res.status(HttpStatus.OK).json(successResponse({ data: rows }));
  } catch (err) {
    next(err);
  }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = (req.verifiedToken as any).user_idx;
  const { title, plan_from, plan_to, total_date, level, emoji, length } = req.body;

  try {
    const sql = `SELECT * FROM tbl_plan WHERE user_id = ? and state ='PROGRESS'`;
    const [rows] = await pool.execute<RowDataPacket[]>(sql, [user_id]);

    if (rows.length > 0) {
      throw new CustomError(
        HttpStatus.FORBIDDEN,
        `이미 플랜이 있습니다.\n기존 플랜을 진행해주세요.`,
        ErrorCode.INVALID_REQUEST,
      );
    }

    // 1) tbl_plan에 새 플랜 넣기
    const planSql =
      'INSERT INTO tbl_plan (title, plan_from, plan_to, total_date, level, emoji, length, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const [planResult] = await pool.execute<ResultSetHeader>(planSql, [
      title,
      plan_from,
      plan_to,
      total_date,
      level,
      emoji,
      length,
      user_id,
    ]);

    // 플랜 id
    const planId = planResult.insertId;

    // 2) tbl_daily에 plan_id를 사용해 한 줄 추가
    const dailySql = 'INSERT INTO tbl_daily (plan_id) VALUES (?)';
    await pool.execute(dailySql, [planId]);

    res.status(HttpStatus.OK).json(successResponse());
  } catch (err) {
    next(err);
  }
};

export const modify = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = (req.verifiedToken as any).user_idx;
  const { id } = req.body;

  try {
    const sql = `UPDATE tbl_plan
                    SET state = 'FINISHED'
                    WHERE user_id = ? and id = ?;`;

    await pool.execute(sql, [user_id, id]);

    res.status(HttpStatus.OK).json(successResponse());
  } catch (err) {
    next(err);
  }
};
