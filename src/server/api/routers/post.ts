import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  
  create: protectedProcedure.input(
    z.object({ name: z.string(), time: z.string(), description: z.string()})
    ).mutation(async ({input, ctx}) => {
      const listing = await ctx.db.post.create({
        data: {
          ...input,
          userId: ctx.auth.userId,
        },
      })
      return listing;
    }),
});
