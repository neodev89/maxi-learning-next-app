import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { loginApp } from "./loginApp";

export const refreshToken = pgTable("refresh_token", {
    id: uuid('id')
        .primaryKey()
        .notNull(),
    userId: uuid('userId').notNull(),
    tokenHash: text().notNull(),
    expiresAt: text().notNull(),
    createdAt: text().notNull(),
    userAgent: text('userAgent'),
    idLogin: uuid('idLogin').notNull().references(
        () => loginApp.id, { onDelete: "cascade" }
    ),
});