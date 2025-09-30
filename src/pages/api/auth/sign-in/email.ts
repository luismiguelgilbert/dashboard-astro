import type { APIRoute } from "astro";
import { auth } from "@/lib/auth.ts"; // path to your auth file

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  return await auth.api.signInEmail({
    body: {
      email: body.email,
      password: body.password,
    },
    asResponse: true
  });
}