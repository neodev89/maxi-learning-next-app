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
            const res: APIResponse<null> = {
                success: false,
                data: null,
                message: "il file è vuoto",
                status: 404,
            };
            return Response.json(
                res,
                { status: 404 }
            );
        }
        const res: APIResponse<TechListTypes> = {
            success: true,
            data: parsed,
            status: 200,
        };
        return Response.json(
            res,
            { status: 200 }
        );
    } catch (error: any) {
        console.error(error);
        return Response.json(error);
    }
};

export async function POST(req: Request) {
    try {
        const tableDb = {
            technologies_list: {
                table: technologiesList,
                dataKey: "technologies"
            },
            ide_list: {
                table: IDEList,
                dataKey: "IDE"
            },
            versioning_list: {
                table: versioningList,
                dataKey: "versioning"
            }
        } as const;


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

        const foundTable = tableDb[body.data.table];
        if (!foundTable) {
            const res: APIResponse<null> = {
                success: false,
                data: null,
                message: "La tabella non combacia con quella inviata dal client",
                status: 404,
            };
            return Response.json(res, { status: 404 });
        }

        let rowsToInsert;
        switch (body.data.table) {
            case "technologies_list":
                rowsToInsert = body.data.data.technologies;
                break;
            case "ide_list":
                rowsToInsert = body.data.data.IDE;
                break;
            case "versioning_list":
                rowsToInsert = body.data.data.versioning;
                break;
        }

        if (!rowsToInsert) {
            const res: APIResponse<null> = {
                success: false,
                data: null,
                message: "I dati non sono coerenti con la tabella",
                status: 400,
            };
            return Response.json(
                res,
                { status: 400 }
            );
        }

        await db.insert(foundTable.table).values(rowsToInsert);
    } catch (err: any) {
        console.error("Errore API:", err);
        const res: APIResponse<any> = {
            success: false,
            data: err,
            message: "Errore interno del server",
            status: 500,
        };
        return Response.json(
            res,
            { status: 500 }
        );
    }
}