import type { APIRoute } from 'astro';
import db from '@/lib/db';

export const GET: APIRoute = async ({ url }) => {
  console.time('[perfCheck - route] > /api/system/users');
  // console.log({params});
  // console.log({request});
  const page = Number(url.searchParams.get('page') ?? 1);
  const sort = String(url.searchParams.get('sort') ?? 1);
  const search = url.searchParams.get('search');
  const limit = 50;
  const offset = (page - 1) * limit;

  console.time('[perfCheck - dbQuery] > /api/system/users');
  const resultset = await db.query(`select 
      user_name,
      user_lastname,
      email,
      is_active,
      count(*) over() as full_count
    from sys_users
    where is_active = True
    ${search ? `and user_name ilike '%${search}%'` : ''}
    order by ${sort}
    limit ${limit}
    offset ${offset}`);
  console.timeEnd('[perfCheck - dbQuery] > /api/system/users');

  const resultStringified = JSON.stringify({
    rows: resultset.rows,
    count: resultset.rows[0]?.full_count ?? 0,
    rowsPerPage: limit,
    currentPage: page,
  });
  console.timeEnd('[perfCheck - route] > /api/system/users');

  return new Response(resultStringified);
};

export const POST: APIRoute = ({ request }) => {
  console.log({request});
  return new Response(
    JSON.stringify({
      message: 'This was a POST!',
    }),
  );
};