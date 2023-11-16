
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  profile: publicProcedure.query(({ctx}) => {
    return ctx.db.profile.findMany();
  }),
  create: protectedProcedure.input(
    z.object({ name: z.string(), aboutMe: z.string(), year: z.string()})
    ).mutation(async ({input, ctx}) => {
      const profile = await ctx.db.profile.create({
        data: {
          ...input,
          userId: ctx.auth.userId,
        },
      })
      return profile;
    }),
  get: publicProcedure.input(
    z.object({ profileId: z.string()})
    ).query(({ ctx, input }) => {
      return ctx.db.profile.findUnique({
        where: {
          id: input.profileId,
        },
      });
    }),
});
