import { authClient } from "@/lib/auth-client.ts";

export const onRequest = async (context, next) => {
  const protectedRoutes = [
    '/system/roles',
    '/system/users',
    '/system/organizations',
  ];

  if (protectedRoutes.includes(context.routePattern)) {
    try {
      console.time('session perfCheck');
      const userSession = await authClient.getSession();
      console.timeEnd('session perfCheck');
      if (!userSession) return context.redirect('/login');
    } catch(err) {
      console.log(err);
      return context.redirect('/login');
    }
  }

  return next();
}