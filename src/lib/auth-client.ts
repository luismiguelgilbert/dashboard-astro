import { createAuthClient } from "better-auth/client";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // baseURL: "http://localhost:3000"
  baseURL: import.meta.env.BETTER_AUTH_URL,
  plugins: [
    usernameClient()
  ]
});
