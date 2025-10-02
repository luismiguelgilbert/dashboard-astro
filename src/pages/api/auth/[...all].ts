import type { APIRoute } from "astro";
import { auth } from "@/lib/auth.ts"; // path to your auth file

export const GET: APIRoute = ({ params, request }) => {
  return auth.handler(request);
}