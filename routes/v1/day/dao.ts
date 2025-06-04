import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../../../back/enum/HttpStatus.enum';
import { successResponse } from '../../../back/utils/apiResponse';

// db
import { RowDataPacket } from 'mysql2';
import getPool from '../../../config/db';
const pool = getPool();

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { day, day_size, level } = req.query;

  const pageValue = Number(day) || 1;
  const pageSizeValue = Number(day_size) || 10;
  const offset = (pageValue - 1) * pageSizeValue;

  try {
    const sql = `SELECT tw.*, tp.id as plan_id
                FROM tbl_word as tw
                LEFT JOIN tbl_plan as tp on tp.level = tw.level
                WHERE tw.level = ?
                ORDER BY tw.id ASC
                LIMIT ${pageSizeValue} OFFSET ${offset}
                `;
    const [rows] = await pool.execute<RowDataPacket[]>(sql, [level]);

    const planId = rows.length > 0 ? rows[0].plan_id : null;
    // word 데이터만 추출
    const wordData = rows.map(({ plan_id, ...word }) => word);

    res.status(HttpStatus.OK).json(
      successResponse({
        data: wordData,
        plan_id: planId,
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
  const { plan_id, day_number } = req.body;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    // 1. 기존 day를 done 처리
    const updateSql = `
      UPDATE tbl_daily AS td
      JOIN tbl_plan AS tp ON tp.id = td.plan_id
      SET td.state = 'done' 
      WHERE td.plan_id = ? AND day_number = ?
    `;
    await conn.execute(updateSql, [plan_id, day_number]);

    // 2. 다음 day가 이미 존재하는지 확인
    const [[existing]] = await conn.execute<RowDataPacket[]>(
      `SELECT id FROM tbl_daily WHERE plan_id = ? AND day_number = ?`,
      [plan_id, day_number + 1],
    );

    // 3. 존재하지 않으면 다음 day 새로 생성
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
