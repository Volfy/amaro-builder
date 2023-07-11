import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { utapi } from "uploadthing/server";

export const utRouter = createTRPCRouter({
  getImageUrl: publicProcedure.input(z.string()).query(async (opts) => {
    const URL = (await utapi.getFileUrls(opts.input))[0]?.url || "";
    return {
      result: URL,
    };
  }),
});
