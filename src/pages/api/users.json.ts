// src/pages/api/users.json.ts
import type { APIRoute } from "astro";
import type { Pool } from "pg";
// import type { DbContext } from "../types"; // See note below on typing

type User = {
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
  
    let users: User[] = [];
    const { rows } = await db.query<User>(`select user_name, user_lastname, avatar_url, id, count(*) OVER() AS total_count
    from sys_users a
    where a.is_active = True`);
    users = rows.splice(0,5);

    return new Response(JSON.stringify(users), { status: 200 });
    // try {
    //   const { rows } = await db.query('SELECT id, name FROM users');
    //   return new Response(JSON.stringify(rows), { status: 200 });
    // }
  }
  catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
  }
};