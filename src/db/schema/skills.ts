import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const skills = pgTable("database_skills", {
    id: uuid("id").primaryKey().notNull(),
    nameSkill: text("name-skill").notNull(),
    nameCompany: text("name-company").notNull(), 
    dateStart: timestamp("date-start").defaultNow().notNull(), 
    dateEnd: timestamp("date-end").defaultNow(), 
    descriptionSkill: text("description-skill"),
});