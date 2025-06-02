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
