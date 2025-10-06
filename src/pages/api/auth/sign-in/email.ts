import type { APIRoute } from 'astro';
import { auth } from '@/lib/auth';
import dbConnection from '@/lib/db';
import cryptr from '@/lib/crypt';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const response = await auth.api.signInEmail({
    body: {
      email: body.email,
      password: body.password,
    },
    returnHeaders: true,
    asResponse: true,
  });

  // Query users permissions
  const userEmail = body.email;
  const userQuery = await dbConnection.query(`select
    sys_profiles_links.sys_link_id  
    from sys_users
    inner join sys_profiles_links on sys_users.sys_profile_id = sys_profiles_links.sys_profile_id
    where sys_users.email = '${userEmail}'`);
  // Encrypt and add [bitt.session_permissions] cookie
  const roles = userQuery.rows.map((item) => item.sys_link_id);
  const encryptedString = cryptr.encrypt(roles.join(','));
  response.headers.append(
    'set-cookie',
    `bitt.session_permissions=${encryptedString}; Max-Age=86400; Path=/; HttpOnly; SameSite=Lax`,
  );

  return response;
};
