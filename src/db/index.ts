import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { registerApp } from "./schema/registerApp";
import { refreshToken } from "./schema/refreshToken";
import { skills } from "./schema/skills";
import { myProjects } from "./schema/myProjects";
import { technologiesList } from "./schema/technologiesList";
import { IDEList } from "./schema/ideList";
import { versioningList } from "./schema/versioningList";

const schema = {
    registerApp,
    refreshToken,
    skills,
    myProjects,
    technologiesList,
    IDEList,
    versioningList,
}

const pool = new Pool({
    host: process.env.SUPABASE_HOST!,
    port: 5432,
    user: process.env.SUPABASE_USER!,
    password: process.env.SUPABASE_DB_PASSWORD!,
    database: process.env.SUPABASE_DATABASE!,
});

export const db = drizzle(pool, { schema });