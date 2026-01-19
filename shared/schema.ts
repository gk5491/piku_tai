import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const wishes = pgTable("wishes", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  name: text("name").notNull(), // "Sender" name, likely the wife or friends
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWishSchema = createInsertSchema(wishes).pick({
  message: true,
  name: true,
});

export type Wish = typeof wishes.$inferSelect;
export type InsertWish = z.infer<typeof insertWishSchema>;
