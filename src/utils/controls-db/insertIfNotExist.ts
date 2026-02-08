import { db } from "@/db";
import { eq, SQLWrapper } from "drizzle-orm";
import { PgTable, TableConfig } from "drizzle-orm/pg-core";

interface propsAPI {
    id: string;
    name: string;
    description: string;
}

interface propsData {
    table: PgTable<TableConfig>;
    column: SQLWrapper;
    data: Array<propsAPI>;
}

interface responseProps {
    message: string;
    dataIns: propsAPI[];
    dataSkip: propsAPI[];
    insLength: number;
    skipLength: number;
    table: PgTable<TableConfig>;
}

export async function insertIfNotExist({
    table,
    column,
    data,
}: propsData): Promise<responseProps> {
    let inserted = [] as Array<propsAPI>;
    let skipped = [] as Array<propsAPI>;
    let response = {} as responseProps;

    const existingTech = await db
        .select()
        .from(table);

    if (existingTech.length === 0) {
        // qui aggiungo i dati perché la tab è vuota
        for (const d of data) {
            await db
                .insert(table)
                .values(d);
            inserted.push(d);

        }
    } else {
        // qui la tab è piena ma non so se i dati siano identici o diversi
        for (const d of data) {
            const selectedDbData = await db
                .select()
                .from(table)
                .where(eq(column, d.id));
            if (selectedDbData.length === 0) {
                await db.insert(table).values(d).returning();
                inserted.push(d);
            } else {
                skipped.push(d);
            }
        };
    }
    if (existingTech.length === 0) {
        response.message = "La tabella era vuota: tutti i dati sono stati inseriti.";
    } else if (inserted.length > 0 && skipped.length > 0) {
        response.message = "Alcuni dati sono stati inseriti, altri erano già presenti.";
    } else if (inserted.length > 0) {
        response.message = "Tutti i dati erano nuovi e sono stati inseriti.";
    } else {
        response.message = "Nessun dato inserito: erano tutti già presenti.";
    }

    return response = {
        ...response,
        dataIns: inserted,
        dataSkip: skipped,
        insLength: inserted.length,
        skipLength: skipped.length,
        table: table,
    };
}