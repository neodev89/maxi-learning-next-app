import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { registerApp } from "./registerApp";

export const myProjects = pgTable("my_projects", {
    id: uuid('id').primaryKey().notNull(),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at"),
    name: text("name").notNull(),
    description: text("description").notNull(),
    userId: uuid("user_id").references(
        () => registerApp.id
    ),
    relativeTech: text("relative_tech").notNull(),
});