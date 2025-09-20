// src/pages/api/users.json.ts
import type { APIRoute } from "astro";
import type { Pool } from "pg";
// import type { DbContext } from "../types"; // See note below on typing

export type User = {
  user_name: string;
  user_lastname: string;
  avatar_url?: string | null;
  id: string;
  total_count: number;
};

export const GET: APIRoute = async ({ locals }) => {
  try {
    // @ts-expect-error env.d.ts isn't working yet
    const db = locals.db as Pool;
  
    // let users: User[] = [];
    console.time('db query');
    const { rows: users } = await db.query<User>(`select user_name, user_lastname, avatar_url, id, count(*) OVER() AS total_count
      from sys_users a
      where a.is_active = True
      limit 5`);
    console.timeEnd('db query');
    // users = rows.splice(0,5);
    // users = rows;

    return new Response(JSON.stringify(users), { status: 200 });
  }
  catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
  }
};