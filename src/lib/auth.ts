import { betterAuth } from "better-auth";
import { Pool } from "pg";
export const auth = betterAuth({
  database: new Pool({
    host: import.meta.env.DATABASE_HOST,
    port: import.meta.env.DATABASE_PORT,
    database: import.meta.env.DATABASE_NAME,
    user: import.meta.env.DATABASE_USER,
    password: import.meta.env.DATABASE_PWD,
    idleTimeoutMillis: 60 * 1000 * 5, // 5 minutes
    connectionTimeoutMillis: 30 * 1000, // 30 seconds
    max: 20, // 20 connections
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  }
});
