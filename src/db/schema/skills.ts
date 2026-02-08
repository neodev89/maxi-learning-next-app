import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const skills = pgTable("database_skills", {
    id: uuid("id").primaryKey().notNull(),
    nameSkill: text("name_skill").notNull(),
    nameCompany: text("name_company"), 
    dateStart: text("date_start").notNull(), 
    dateEnd: text("date_end"), 
    descriptionSkill: text("description"),
});