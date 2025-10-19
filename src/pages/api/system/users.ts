import type { APIRoute } from 'astro';
import db from '@/lib/db';

export const GET: APIRoute = async ({ url }) => {
  // console.log({params});
  // console.log({request});
  console.log({url});
  const page = Number(url.searchParams.get('page') ?? 1);
  const sort = String(url.searchParams.get('sort') ?? 1);
  const limit = 25;
  const offset = (page - 1) * limit;
  // const sort = Number(url.searchParams.get('sort') ?? 1);
  const resultset = await db.query(`select user_name, user_lastname, email, is_active
    from sys_users
    where is_active = True
    order by ${sort}
    limit ${limit}
    offset ${offset}`);
  return new Response(
    JSON.stringify({
      data: resultset.rows,
      meta: {
        count: 500,
      }
    }),
    // JSON.stringify({
    //   message: 'This was a GET!',
    // }),
  );
};

export const POST: APIRoute = ({ request }) => {
  console.log({request});
  return new Response(
    JSON.stringify({
      message: 'This was a POST!',
    }),
  );
};