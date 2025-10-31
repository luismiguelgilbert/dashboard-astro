import type { APIRoute } from 'astro';
import db from '@/lib/db';
import { convertURLSearchParamsToObject } from '@/types/Utils';
import { ParamsSchema, DefaultParamsSchema } from '@/types/Users';

export const GET: APIRoute = async ({ url }) => {
  // console.log({params});
  // console.log({request});
  // console.log(url.searchParams);
  const urlSearchParams = url.searchParams;
  const params = convertURLSearchParamsToObject(urlSearchParams);
  const safeParsedResult = ParamsSchema.safeParse(params);
  const filters = safeParsedResult.success ? safeParsedResult.data : DefaultParamsSchema.parse({});
  const page = filters.page;
  const sort = filters.sort;
  const direction = filters.direction;
  const is_active = filters.is_active;
  const user_sex = filters.user_sex;
  const search = filters.search;
  const limit = 50;
  const offset = (page - 1) * limit;

  console.time('[perfCheck - dbQuery] > /api/system/users');
  const resultset = await db.query(`select
      INITCAP(user_name) as user_name,
      INITCAP(user_lastname) as user_lastname,
      user_sex,
      email,
      is_active,
      count(*) over() as full_count
    from sys_users
    where 1 = 1
    ${search ? `and user_name ilike '%${search}%'` : ''}
    ${is_active ? `and is_active in (${is_active})` : ''}
    ${user_sex ? `and user_sex in (${user_sex})` : ''}
    order by ${sort} ${direction}
    limit ${limit}
    offset ${offset}`);
  console.timeEnd('[perfCheck - dbQuery] > /api/system/users');

  const resultStringified = JSON.stringify({
    rows: resultset.rows,
    count: resultset.rows[0]?.full_count ?? 0,
    rowsPerPage: limit,
    currentPage: page,
  });

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
