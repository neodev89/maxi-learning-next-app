import path from "path";
import fs from "fs/promises";
import { TechListTypes } from "@/@types/techListType";

export async function GET() {
    const filePath = path.join(process.cwd(), "src/tech-list/techList.json");

    try {
        const fileTechList = await fs.readFile(
            filePath,
            { encoding: "utf-8" },
        );
        const jsonFile = JSON.parse(fileTechList) as TechListTypes;

        if (!jsonFile) {
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
            data: jsonFile,
            status: 200,
        }, {
            status: 200,
        });
    } catch (error: any) {
        console.error(error);
        return Response.json(error);
    }
}