import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const skills = pgTable("database_skills", {
    id: uuid("id").primaryKey().notNull(),
    nameSkill: text("name-skill").notNull(),
    nameCompany: text("name-company"), 
    dateStart: text("date-start").notNull(), 
    dateEnd: text("date-end"), 
    descriptionSkill: text("description-skill"),
});