import type { APIRoute } from "astro";
import { auth } from "@/lib/auth.ts"; // path to your auth file

export const GET: APIRoute = ({ params, request }) => {
  console.log('this is me');
  console.log({ params });
  // return new Response(
  //   JSON.stringify({
  //     name: "Astro",
  //     url: "https://astro.build/",
  //   }),
  // );
  // return auth.handler(toWebRequest(event));
  return auth.handler(request);
}