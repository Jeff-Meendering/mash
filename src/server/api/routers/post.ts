import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  post: publicProcedure.query(({ctx}) => {
    return ctx.db.post.findMany();
  }),
  get: publicProcedure.input(
    z.object({ postId: z.string()})
    ).query(({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: {
          id: input.postId,
        },
      });
  }),
  getMessage: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input, ctx }) => {
      const messages = await ctx.db.message.findMany({
        where: {
          postID: input.postId,
        },
      });
      return messages;
    }),
  sendMessage: protectedProcedure.input(
    z.object({ postId: z.string(), message: z.string() })
    ).mutation(async ({ input, ctx }) => {
      const message = await ctx.db.message.create({
        data: {
          message: input.message,
          postID: input.postId,
          fromUser: ctx.auth.userId,
          fromUserName: ctx.auth.user?.username || "Unknown",
        },
      });
      return message;
    }),
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
