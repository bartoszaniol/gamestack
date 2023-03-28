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
      return {
        success: `xd`,
      };
    }),

  getAllGamesByUserId: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.game.findMany({
      where: { addedByUserId: ctx.session?.user.id },
    });
  }),

  getPlatforms: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.platform.findMany();
  }),

  deleteGame: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.game.delete({ where: { id: input } });
      return {
        success: `true`,
      };
    }),

  getUserPlatforms: publicProcedure.query(async ({ ctx }) => {
    return (await ctx.prisma.$queryRaw`
      select Platform.name, Platform.id, Platform.image from Platform join Game on Platform.id = Game.platformId join User on User.id = Game.addedByUserId;`) as Platform[];
  }),
});
