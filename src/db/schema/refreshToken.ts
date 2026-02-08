import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { registerApp } from "./registerApp";


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
        () => registerApp.id, { onDelete: "cascade" }
    ),
});