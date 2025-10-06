import { auth } from '@/lib/auth';
import cryptr from '@/lib/crypt';

const protectedRoutes = [
  '/system/roles',
  '/system/users',
  '/system/organizations',
];

export const onRequest = async (context, next) => {
  try {
    console.time('session perfCheck');
    const isAuthed = await auth.api.getSession({
      headers: context.request.headers,
    });
    console.timeEnd('session perfCheck');

    const permissionsEncrypted = context.cookies.get(
      'bitt.session_permissions',
    );
    if (permissionsEncrypted) {
      context.locals.permissions = cryptr.decrypt(permissionsEncrypted.value);
    }
    if (isAuthed) {
      context.locals.user = isAuthed.user;
      context.locals.session = isAuthed.session;
    }

    if (protectedRoutes.includes(context.routePattern) && !isAuthed) {
      context.locals.user = null;
      context.locals.session = null;
      context.locals.permissions = null;
      return context.redirect('/login');
    }

    return next();
  } catch (err) {
    console.log(err);
    return context.redirect('/login');
  }
};
