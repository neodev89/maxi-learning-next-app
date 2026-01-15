import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { loginApp } from "./schema/loginApp";
import { refreshToken } from "./schema/refreshToken";
import { skills } from "./schema/skills";

const schema = {
    loginApp,
    refreshToken,
    skills,
}

const pool = new Pool({
    connectionString: process.env.SUPABASE_DB_URL,
});

export const db = drizzle(pool, { schema });