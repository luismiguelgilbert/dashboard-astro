import { Pool } from 'pg';

// Make sure we DO NOT "prerender" this function to allow the ENV variables to update on the fly
export const prerender = false;

// const client = new pg.Client({
//   host: import.meta.env.DATABASE_HOST,
//   port: import.meta.env.DATABASE_PORT,
//   database: import.meta.env.DATABASE_NAME,
//   user: import.meta.env.DATABASE_USER,
//   password: import.meta.env.DATABASE_PWD,
// });
const client = new Pool({
  host: import.meta.env.DATABASE_HOST,
  port: import.meta.env.DATABASE_PORT,
  database: import.meta.env.DATABASE_NAME,
  user: import.meta.env.DATABASE_USER,
  password: import.meta.env.DATABASE_PWD,
});

await client.connect()

client.on('acquire', () => console.log('PG client pool "acquire"'));
client.on('connect', () => console.log('PG client pool "connect"'));
client.on('error', () => console.log('PG client pool "error"'));
client.on('release', () => console.log('PG client pool "release"'));
client.on('remove', () => console.log('PG client pool "remove"'));

export { client as db };