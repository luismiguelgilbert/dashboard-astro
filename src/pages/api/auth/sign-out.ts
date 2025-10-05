import type { APIRoute } from "astro";
import { auth } from "@/lib/auth.ts";

export const POST: APIRoute = async ({ cookies, request }) => {
  cookies.delete('bitt.session_data', { path: '/' });
  cookies.delete('bitt.session_token', { path: '/' });
  await auth.api.signOut({ headers: request.headers });
  return new Response();
}