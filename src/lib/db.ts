import { Pool } from 'pg';

const db = new Pool({
  host: import.meta.env.DATABASE_HOST,
  port: Number(import.meta.env.DATABASE_PORT),
  database: import.meta.env.DATABASE_NAME,
  user: import.meta.env.DATABASE_USER,
  password: import.meta.env.DATABASE_PWD,
  idleTimeoutMillis: 60 * 1000 * 5, // 5 minutes
  connectionTimeoutMillis: 30 * 1000, // 30 seconds
  max: 20, // 20 connections
});

// Optional: Handle errors on idle clients
db.on('error', (err) => console.error('Unexpected error on idle client', err));
db.on('connect', () => console.log('connected..'));

export default db;
