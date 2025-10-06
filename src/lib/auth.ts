import { betterAuth } from 'better-auth';
import { username } from 'better-auth/plugins';
import { Pool } from 'pg';

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
  },
  plugins: [username()],
  advanced: { cookiePrefix: 'bitt' },
  session: {
    expiresIn: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24, // 1 day
    },
  },
  // trustedOrigins: ['http://localhost:4321', 'http://192.168.68.64:4321']
});
