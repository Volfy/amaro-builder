import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";

import Neode from 'neode'
import Recipe from '../../models/Recipe'
import UserSchema from '../../models/User'
import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/types/server";

const filterUserForClient = (user: User) => {
  return { id: user.id, 
    username: user.username, 
    profileImageUrl: user.profileImageUrl
  }
}

export const exampleRouter = createTRPCRouter({
  testing: publicProcedure
    .query(async () => {

      const instance = Neode.fromEnv()
        .with({
          Recipe: Recipe,
          User: UserSchema
      })
      
      /* await instance.create('User', {
          clerkId: 'user_xxxx',
          name: 'xxxx',
          active: true,
      }) */
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      const received = (await instance.all('User')).map(u => u.properties())
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      const userId = received.map(u => u.clerkId)

      const users = (await clerkClient.users.getUserList({
        userId: userId
      })).map(filterUserForClient)

      return {
        result: users
      }
      
    })
});
