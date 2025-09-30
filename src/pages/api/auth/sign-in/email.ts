import type { APIRoute } from "astro";
import { auth } from "@/lib/auth.ts"; // path to your auth file

export const POST: APIRoute = async ({ request, redirect }) => {
  console.log('this is me');
  const body = await request.json();
  console.log(body);
  console.log(body.email);
  console.log(body.password);

  const data = await auth.api.signInEmail({
    body: {
      email: body.email,
      password: body.password,
    },
    asResponse: true
  });

  console.log({ data });
  
  // return new Response(data);
  return data;
  // return redirect('/', 302);
  // return red
  
  // return new Response(
  //   JSON.stringify({
  //     name: "Astro",
  //     url: "https://astro.build/",
  //   }),
  // );
  // return auth.handler(toWebRequest(event));
  // return auth.handler(request);
  // return new Response('this is response from server');
}