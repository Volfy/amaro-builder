import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";
import { recipeRouter } from "~/server/api/routers/recipe";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  recipe: recipeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
