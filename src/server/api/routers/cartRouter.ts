import { z } from "zod";
import { protectedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { db } from "~/server/db";

export const cartRouter = createTRPCRouter({
  addToCart: protectedProcedure
    .input(
      z.object({
        itemId: z.string(),
        quantity: z.number().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;
      if (!user) throw new Error("User must be logged in to add items to the cart.");

      const existingCartItem = await db.cartItem.findFirst({
        where: { stockId: input.itemId, userId: user.id },
      });

      if (existingCartItem) {
        await db.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + input.quantity },
        });
      } else {
        await db.cartItem.create({
          data: {
            stockId: input.itemId,
            userId: user.id,
            quantity: input.quantity,
          },
        });
      }

      return { success: true };
    }),

  addCustomOrderToCart: protectedProcedure
    .input(
      z.object({
        deckId: z.string(),
        wheelsId: z.string(),
        quantity: z.number().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;
      if (!user) throw new Error("User must be logged in to add items to the cart.");

      const userId = ctx.session.user.id;

      const deck = await db.stock.findUnique({
        where: { id: input.deckId },
      });

      const wheels = await db.stock.findUnique({
        where: { id: input.wheelsId },
      });

      if (!deck || deck.type !== "DECK") {
        throw new Error("Invalid deck selected.");
      }

      if (!wheels || wheels.type !== "WHEEL") {
        throw new Error("Invalid wheels selected.");
      }

      const existingCartItem = await db.cartItem.findFirst({
        where: {
          userId: user.id,
          customOrder: {
            deckId: input.deckId,
            wheelsId: input.wheelsId,
          },
        },
      });

      if (existingCartItem) {
        await db.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + input.quantity },
        });
      } else {
        const totalCost = deck.cost + wheels.cost + 5;

        const customOrder = await db.customOrder.create({
          data: {
            deckId: deck.id,
            wheelsId: wheels.id,
            cost: totalCost,
            //imageUrl: deck.imageUrl,
          },
        });

        // Add the custom order to the cart
        await db.cartItem.create({
          data: {
            userId: userId,
            customOrderId: customOrder.id,
            quantity: input.quantity,
          },
        });
        return { success: true };
      }
    }),

  removeFromCart: protectedProcedure
    .input(
      z.object({
        stockId: z.string().optional(),
        customOrderId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { stockId, customOrderId } = input;

      if (!stockId && !customOrderId) {
        throw new Error("Either stockId or customOrderId must be provided.");
      }

      const cartItem = await db.cartItem.findFirst({
        where: {
          userId: ctx.session.user.id,
          ...(stockId ? { stockId } : { customOrderId }),
        },
      });

      if (!cartItem) {
        throw new Error("Cart item not found.");
      }

      if (cartItem.quantity > 1) {
        await db.cartItem.update({
          where: {
            id: cartItem.id,
            //userId: ctx.session.user.id,
          },
          data: { quantity: cartItem.quantity - 1 },
        });
      } else {
        await db.cartItem.delete({
          where: {
            id: cartItem.id,
            //userId: ctx.session.user.id,
          },
        });
      }

      return { success: true };
    }),


  getCartItems: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    return await db.cartItem.findMany({
      where: { userId },
      include: {
        stock: true,
        customOrder: true,
      },
      orderBy: {
        createdAt: "asc",
      }
    });
  }),

});
