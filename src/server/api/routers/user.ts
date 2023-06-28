import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/types/server";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};

export const userRouter = createTRPCRouter({
  getUserDetails: publicProcedure.input(z.string()).query(async (opts) => {
    const id = opts.input;

    const user = filterUserForClient(await clerkClient.users.getUser(id));

    return {
      result: user,
    };
  }),
});
