import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const gameRouter = createTRPCRouter({
  addGame: protectedProcedure
    .input(
      z.object({ title: z.string(), platformId: z.string(), image: z.string() })
    )
    .mutation(async ({ input, ctx }) => {
      const newGame = await ctx.prisma.game.create({
        data: {
          title: input.title,
          platformId: input.platformId,
          image: input.image,
          addedByUserId: ctx.session?.user.id,
        },
      });
      return {
        success: `xd`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany({ where: { id: ctx.session?.user.id } });
  }),
});
