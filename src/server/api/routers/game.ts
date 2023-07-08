import { Platform } from "@prisma/client";
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
    }),

  getAllGamesByUserId: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.game.findMany({
      where: { addedByUserId: ctx.session?.user.id },
    });
  }),

  getGameById: publicProcedure
    .input(z.object({ gameId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.game.findUnique({
        where: { id: input.gameId },
      });
    }),

  getPlatforms: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.platform.findMany();
  }),

  deleteGame: publicProcedure
    .input(z.object({ gameId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.game.delete({ where: { id: input.gameId } });
      return {
        success: `true`,
      };
    }),

  updateGame: publicProcedure
    .input(
      z.object({
        gameId: z.string(),
        title: z.string(),
        platformId: z.string(),
        image: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.game.update({
        where: { id: input.gameId },
        data: {
          title: input.title,
          platformId: input.platformId,
          image: input.image,
        },
      });
      return {};
    }),

  getUserPlatforms: publicProcedure.query(async ({ ctx }) => {
    return (await ctx.prisma.$queryRaw`
      select Platform.name, Platform.id, Platform.image from Platform join Game on Platform.id = Game.platformId join User on User.id = ${ctx.session?.user.id} group by Platform.id order by Platform.id;`) as Platform[];
  }),
});
