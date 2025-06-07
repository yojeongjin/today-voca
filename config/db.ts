import mysql from 'mysql2/promise';
import { Pool } from 'mysql2/promise';

import dotenv from 'dotenv';
dotenv.config();

const dbInfo = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool: Pool | null = null;

const getPool = (): Pool => {
  if (!pool) {
    pool = mysql.createPool(dbInfo);
    console.log('DB pool created');
  }
  return pool;
};

export default getPool;
