import pg from 'pg';

// Make sure we DO NOT "prerender" this function to allow the ENV variables to update on the fly
export const prerender = false;

const client = new pg.Client({
  host: import.meta.env.DATABASE_HOST,
  port: import.meta.env.DATABASE_PORT,
  database: import.meta.env.DATABASE_NAME,
  user: import.meta.env.DATABASE_USER,
  password: import.meta.env.DATABASE_PWD,
});

await client.connect()

export { client as db };