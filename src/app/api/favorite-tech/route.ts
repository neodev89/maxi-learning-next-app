import jwt from 'jsonwebtoken';

import { APIResponse } from "@/@types/apiRes";
import { db } from "@/db";
import { favoriteTechnologies } from "@/db/schema/favoriteTechnologies";
import { favoriteTechSchema } from "@/zod/favoriteTech";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { PropsTechTypes } from '@/@types/techListType';


const signToken = process.env.SIGNATURE_TOKEN!;
const tokenKey = process.env.TOKEN_KEY!;

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(tokenKey)?.value;
        let decodeToken: PropsTechTypes;

        const body = await req.json();
        const parseSchemaZodBody = await favoriteTechSchema.safeParseAsync(body);

        try {
            if (!token) {
                const res: APIResponse<null> = {
                    success: false,
                    data: null,
                    message: "token invalidato o non presente",
                    status: 401,
                };
                return Response.json(
                    res,
                    { status: 401 }
                );
            }
            decodeToken = jwt.verify(token, signToken) as PropsTechTypes;
        } catch (error) {
            const res: APIResponse<null> = {
                success: false,
                data: null,
                message: "Token invalido o non esistente",
                status: 401,
            };
            return Response.json(
                res,
                { status: 401 },
            );
        }

        // controllo che il body abbia i dati uguali al mio schema ZOd
        if (!parseSchemaZodBody.success) {
            const res: APIResponse<null> = {
                success: false,
                data: null,
                message: "Il body restituito non è conforme allo schema aspettato",
                status: 400,
            };
            return Response.json(
                res,
                { status: 400 },
            );
        }

        // controllo che i dati non siano già stati caricati in precedenza
        const existing = await db
            .select()
            .from(favoriteTechnologies)
            .where(
                eq(favoriteTechnologies.name, parseSchemaZodBody.data?.name)
            );

        if (existing.length > 0) {
            const res: APIResponse<null> = {
                success: false,
                data: null,
                message: "I dati sono stati già inseriti",
                status: 409
            };
            return Response.json(
                res,
                { status: 409 },
            );
        }

        await db
            .insert(favoriteTechnologies)
            .values({
                ...parseSchemaZodBody.data,
                userId: decodeToken.id,
            })
            .returning();

    } catch (error: any) {
        console.log("Errore a monte della API: ", error);
        
        const res: APIResponse<any> = {
            success: false,
            data: error,
            message: "L'api non è riuscita a trovare il percorso",
            status: 500,
        };
        return Response.json(
            res,
            { status: 500 },
        );
    }
}