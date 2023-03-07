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
          addedByUserId: ctx.session.user.id,
        },
      });
      return {
        success: `xd`,
      };
    }),

  getAllGamesById: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.game.findMany({
      where: { addedByUserId: ctx.session?.user.id },
    });
  }),

  getUserPlatforms: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma
      .$queryRaw`select Platform.name from User join Game on User.id = Game.addedByUserId join Platform on Game.platformId = Platform.id;`;
  }),
});
