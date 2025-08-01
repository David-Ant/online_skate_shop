import { z } from "zod";
import { protectedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { db } from "~/server/db";

export const adminRouter = createTRPCRouter({

  getOrders: protectedProcedure.query(async () => {
    return await db.order.findMany();
  }),

  getOrderById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await db.order.findUnique({
        where: {
          id: input.id
        },
        include: {
          stockItems: {
            include: {
              stock: true,
              customOrder: {
                include: {
                  deck: true,
                  wheels: true,
                }
              }
            },
          }
        }
      });
    }),

  changeStatus: protectedProcedure
    .input(
      z.object({
        orderId: z.string(),
        status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updated = await ctx.db.order.update({
        where: { id: input.orderId },
        data: { status: input.status },
      });
      return updated;
    }),
});
