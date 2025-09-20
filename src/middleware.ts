import { defineMiddleware } from "astro:middleware";
import { db } from "@/db";

export const onRequest = defineMiddleware(async (context, next) => {
  // Attach the database pool to the context.locals object
  // @ts-expect-error env.d.ts isn't working yet
  context.locals.db = db;
  
  // Continue to the next middleware or route handler
  return next();
});