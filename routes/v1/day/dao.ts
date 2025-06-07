import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../../../back/enum/HttpStatus.enum';
import { successResponse } from '../../../back/utils/apiResponse';

// db
import { RowDataPacket } from 'mysql2';
import getPool from '../../../config/db';
const pool = getPool();

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = (req.verifiedToken as any).user_idx;
  const { day, day_size, level } = req.query;

  const pageValue = Number(day);
  const pageSizeValue = Number(day_size);
  const offset = (pageValue - 1) * pageSizeValue;

  try {
    const sql = `SELECT tw.*, tp.id as plan_id, td.percent
                FROM tbl_word as tw
                LEFT JOIN tbl_plan as tp on tp.level = tw.level
                LEFT JOIN tbl_daily as td on td.plan_id = tp.id
                WHERE 
                  tw.level = ? and td.day_number = ? and tp.user_id = ? and tp.state = 'PROGRESS'
                ORDER BY tw.id ASC
                LIMIT ${pageSizeValue} OFFSET ${offset}
                `;
    const [rows] = await pool.execute<RowDataPacket[]>(sql, [level, day, user_id]);

    const planId = rows.length > 0 ? rows[0].plan_id : null;
    const percent = rows.length > 0 ? rows[0].percent : null;
    // word 데이터만 추출
    const wordData = rows.map(({ plan_id, ...word }) => word);

    res.status(HttpStatus.OK).json(
      successResponse({
        data: wordData,
        plan_id: planId,
        percent: percent,
      }),
    );
  } catch (err) {
    next(err);
  }
};

export const modify = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = (req.verifiedToken as any).user_idx;
  const { state, step, day_number } = req.body;

  try {
    const daySql = `UPDATE tbl_daily AS td
                    JOIN tbl_plan AS tp ON tp.id = td.plan_id
                    JOIN tbl_user AS tu ON tp.user_id = tu.id
                    SET td.state = ?, td.current_step = ?
                    WHERE tu.id = ? and td.day_number = ?;`;

    await pool.execute(daySql, [state, step, user_id, day_number]);

    res.status(HttpStatus.OK).json(successResponse());
  } catch (err) {
    next(err);
  }
};

export const done = async (req: Request, res: Response, next: NextFunction) => {
  const { plan_id, day_number, step } = req.body;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    // 1. 기존 day 완료 처리
    const updateSql = `
      UPDATE tbl_daily AS td
      JOIN tbl_plan AS tp ON tp.id = td.plan_id
      SET 
        td.state = 'done',
        td.percent = CASE WHEN ? = 3 THEN 100 ELSE td.percent END
      WHERE td.plan_id = ? AND day_number = ?
    `;
    await conn.execute(updateSql, [step, plan_id, day_number]);

    // 2. 다음 day 존재 확인
    const [[existing]] = await conn.execute<RowDataPacket[]>(
      `SELECT id FROM tbl_daily WHERE plan_id = ? AND day_number = ?`,
      [plan_id, day_number + 1],
    );

    // 3. 없으면 새로 생성
    if (!existing) {
      const insertSql = `
        INSERT INTO tbl_daily (plan_id, day_number)
        VALUES (?, ?)
      `;
      await conn.execute(insertSql, [plan_id, day_number + 1]);
    }

    await conn.commit();
    res.status(HttpStatus.OK).json(successResponse());
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
};
