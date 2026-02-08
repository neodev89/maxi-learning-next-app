import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const versioningList = pgTable('versioning_list', {
    id: uuid('id').primaryKey().notNull(),
    name: text('name').notNull(),
    description: text('description').notNull(),
});
