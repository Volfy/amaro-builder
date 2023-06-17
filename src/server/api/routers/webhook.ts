import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const webhookRouter = createTRPCRouter({
  usercreated: publicProcedure
    .query(() => {
      console.log('RECEIVED WEBHOOK CALL')
    })
});
