import { Pool } from "pg";

let dbConnected = false;
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
db.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  // process.exit(-1); // Exit the process in case of a critical error
});
db.on('connect', ()=> {
  console.log('connected..');
  dbConnected = true;
});

const dbConnection = async () => {
  if (!dbConnected) await db.connect();
  return db;
};

export default db;