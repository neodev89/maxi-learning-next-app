import fs from "fs/promises";
import path from "path";

import { technologiesList } from "@/db/schema/technologiesList";
import { techList } from "@/@types/techList";
import { insertIfNotExist } from "@/utils/controls-db/insertIfNotExist";
import { IDEList } from "@/db/schema/ideList";
import { versioningList } from "@/db/schema/versioningList";


export async function POST() {
    try {
        const filePath = path.join(process.cwd(), "./tech-list/techList.json");
        const fileTechList = await fs.readFile(filePath, { encoding: 'utf-8' });

        if (!fileTechList) {
            return Response.json({
                success: false,
                message: 'File delle tecnologie non trovato',
                status: 404
            }, { status: 404 });
        }
        // il file è un oggetto che contiene tre chiavi le quali contengono un array di oggetti
        const parsedTechList: techList = JSON.parse(fileTechList);
        const { technologies, IDE, versioning } = parsedTechList;

        const techRes = await insertIfNotExist({
            table: technologiesList,
            column: technologiesList.id,
            data: technologies,
        });
        console.log(techRes.message);

        const ideRes = await insertIfNotExist({
            table: IDEList,
            column: IDEList.id,
            data: IDE,
        });
        console.log(ideRes.message);

        const versRes = await insertIfNotExist({
            table: versioningList,
            column: versioningList.id,
            data: versioning,
        });
        console.log(versRes.message);

        return Response.json({
            success: true,
            message: "Sincronizzazione completata",
            data: { techRes, ideRes, versRes },
            detailed: true,
            status: 207,
        }, { status: 207 })

    } catch (error: any) {
        console.error(error);
        return Response.json({
            success: false,
            message: "Errore nella chiamata all'API",
            error: error,
            status: 500,
        }, { status: 500 })
    }
}