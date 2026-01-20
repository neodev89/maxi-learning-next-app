import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const registerApp = pgTable("register_app", {
    id: uuid('id').primaryKey().notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    createdAt: text().notNull(),
    updatedAt: text().notNull(),
    emailVerified: boolean(),
    role: text().notNull(),
});