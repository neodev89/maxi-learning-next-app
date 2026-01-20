import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { skills } from "./skills";

export const loginApp = pgTable("login_app", {
    id: uuid('id').primaryKey().notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    idToken: uuid('idToken').notNull().references(
        () => skills.id, { onDelete: "no action"}
    ),
});