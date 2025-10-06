import type { APIRoute } from "astro";
import { auth } from "@/lib/auth.ts";

export const POST: APIRoute = async ({ cookies, request }) => {
  try {
    cookies.delete('bitt.session_data', { path: '/' });
    cookies.delete('bitt.session_token', { path: '/' });
    cookies.delete('bitt.session_permissions', { path: '/' });
    await auth.api.signOut({ headers: request.headers });
    return new Response();
  }
  catch (error) {
    console.error(error);
    return new Response();
  }
}