CREATE TABLE "database-skills" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name-skill" text NOT NULL,
	"name-company" text NOT NULL,
	"date-start" timestamp NOT NULL,
	"date-end" timestamp,
	"description-skill" text
);
