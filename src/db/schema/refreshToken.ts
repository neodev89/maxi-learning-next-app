import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { loginApp } from "./loginApp";

export const refreshToken = pgTable("refresh_token", {
    id: uuid('id')
        .primaryKey()
        .notNull(),
    userId: uuid('userId').notNull().references(() => loginApp.id, { onDelete: "cascade" }),
    tokenHash: text().notNull(),
    expiresAt: timestamp('expiresAt').defaultNow().notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    userAgent: text('userAgent'),
});