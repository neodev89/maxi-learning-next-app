import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const loginApp = pgTable("login_app", {
    id: uuid('id').primaryKey().notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
    emailVerified: boolean(),
    role: text().notNull(),
});