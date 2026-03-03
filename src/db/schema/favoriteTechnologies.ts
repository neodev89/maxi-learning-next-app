import { pgTable, text, uuid, integer } from "drizzle-orm/pg-core";
import { registerApp } from "./registerApp";

export const favoriteTechnologies = pgTable('favorite_technologies', {
    id: uuid('id').primaryKey().notNull().references(
        () => registerApp.id
    ),
    name: text('name').notNull(),
    description: text('description').notNull(),
    experienceYear: integer('experience_year').notNull(),
    experienceMonth: integer('experience_month').notNull(),
    userId: uuid('user_id').notNull().references(
        () => registerApp.id, { onDelete: 'cascade' }
    ),
});