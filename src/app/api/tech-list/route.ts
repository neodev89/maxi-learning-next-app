import path from "path";
import fs from "fs/promises";
import { TechListTypes } from "@/@types/techListType";

export async function GET() {
    const filePath = path.join(process.cwd(), "src/tech-list/techList.json");
    const fileTechList = await fs.readFile(
        filePath,
        { encoding: "utf-8" },
    );
    const jsonFile = JSON.parse(fileTechList) as TechListTypes;

    return Response.json({
        success: true,
        data: jsonFile,
    });
}