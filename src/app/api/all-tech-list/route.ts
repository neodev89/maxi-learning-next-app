import path from "path";
import fs from "fs/promises";
import { TechListTypes } from "@/@types/techListType";

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
    })
    } catch (error: any) {
        console.error(error);
        return Response.json(error);
    }
}