import path from "path";
import fs from "fs/promises";
import { TechListTypes } from "@/@types/techListType";
import { saveChoiceSchema } from "@/zod/saveChoosedData";
import { APIResponse } from "@/@types/apiRes";
import { db } from "@/db";
import { technologiesList } from "@/db/schema/technologiesList";
import { IDEList } from "@/db/schema/ideList";
import { versioningList } from "@/db/schema/versioningList";

export async function GET() {
    const filePath = path.join(
        process.cwd(), "src/tech-list/allTechList.json"
    );

    try {
        const fileAllTech = await fs.readFile(
            filePath,
            { encoding: 'utf-8' }
        );

        const parsed = JSON.parse(fileAllTech) as TechListTypes;

        if (!parsed) {
            console.error("Non ci sono dati");
            return Response.json({
                success: false,
                data: null,
                message: "il file è vuoto",
                status: 404,
            }, {
                status: 404,
            });
        }

        return Response.json({
            success: true,
            data: parsed,
            status: 200,
        }, {
            status: 200,
        });
    } catch (error: any) {
        console.error(error);
        return Response.json(error);
    }
};

export async function POST(req: Request) {
    const tableDb = [
        {
            table: technologiesList,
            name: 'technologies_list',
        },
        {
            table: IDEList,
            name: 'ide_list',
        },
        {
            table: versioningList,
            name: 'versioning_list',
        }
    ];
    const request = await req.json();
    const body = await saveChoiceSchema.safeParseAsync(request);

    if (!body.success) {
        const res: APIResponse<null> = {
            success: false,
            data: null,
            message: "Il body non rispetta la forma decisa",
            status: 400,
        };
        return Response.json(res, { status: 400 });
    }

    const foundedTable = tableDb.find(el => el.name === body.data.table);
    if (!foundedTable) {
        const res: APIResponse<null> = {
            success: false,
            data: null,
            message: 'La tabella non è stata trovata',
            status: 400
        };
        return Response.json(res, { status: 400 });
    }

    // 🔥 Estrai l’array corretto 
    let rowsToInsert;
    switch (body.data.table) {
        case "technologies_list":
            rowsToInsert = body.data.data.technologies;
            break;
        case "ide_list":
            rowsToInsert = body.data.data.IDE;
            break;
        case "versioning_list":
            rowsToInsert = body.data.data.versioning
            break;
    }

    // 🔥 Ora Drizzle è felice 
    await db.insert(foundedTable.table).values(rowsToInsert);
}