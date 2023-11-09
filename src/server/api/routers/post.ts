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
    .query(async ({ctx}) => {
      const userId = ctx.auth.userId;
      const post = await ctx.db.post.findMany({
        where: {
          userId,
        },
        include: {
          message: true,
        },
      });
      return post.flatMap((post) => post.message);
    }),
  sendMessage: protectedProcedure.input(
    z.object({ message: z.string(), postId: z.string()})
    ).mutation(async ({input, ctx}) => {
      const message = await ctx.db.message.create({
        data: {
          fromUser: ctx.auth.userId,
          fromUserName: ctx.auth.user?.username ?? "unknown",
          message: input.message,
          postID: input.postId,
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
