import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { db } from "../../db";

const StockTypeEnum = z.enum(["DECK", "WHEEL"]);

export const stockRouter = createTRPCRouter({

  // Fetch all stock data
  getStock: publicProcedure.query(async () => {
    return await db.stock.findMany();
  }),

  getStockByType: publicProcedure
    .input(z.object({ type: StockTypeEnum }))
    .query(async ({ input }) => {
      return await db.stock.findMany({
        where: {
          type: input.type,
        },
      });
    }),

  // Filter stock items based on search query
  filterStock: publicProcedure
    .input(z.object({ query: z.string().trim() }))
    .query(async ({ input }) => {
      return await db.stock.findMany({
        where: {
          name: {
            contains: input.query,
            mode: "insensitive",
          },
        },
      });
    }),

  getItemById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await db.stock.findUnique({
        where: {
          id: input.id
        },
      });
    }),
});
