import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";
import { recipeRouter } from "~/server/api/routers/recipe";
import { utRouter } from "~/server/api/routers/ut";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  recipe: recipeRouter,
  ut: utRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
