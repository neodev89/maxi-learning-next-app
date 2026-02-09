import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { db } from "@/db";
import { formSignInInstance, validationUsersToDB } from "@/zod/formSignIn";
import { cookies } from 'next/headers';

const signToken = process.env.SIGNATURE_TOKEN!;
const tokenKey = process.env.TOKEN_KEY!;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Il body è: ", body);

        // 1. Validazione input
        const parsed = formSignInInstance.parse(body);
        console.log("Il body parsato è: ", parsed);

        // 2. Cerca utente nel DB
        const user = await db.query.registerApp.findFirst({
            where: (table, { eq }) => eq(table.email, parsed.email),
        });

        console.log("l'user trovato è: ", user);
        // 3. Risposta se utente non trovato
        if (!user) {
            return Response.json({
                success: false,
                message: 'Utente non registrato',
                status: 404,
            }, { status: 404 });
        }

        // 4. Verifica password
        const passwordCorretta = await bcrypt.compare(
            parsed.password,
            user.password,
        );

        if (!passwordCorretta) {
            return Response.json({
                success: false,
                message: 'Credenziali non valide',
                status: 401,
            }, { status: 401 });
        }

        // 6. Rimuovi password
        const { password, ...publicUser } = user;

        // 5. Validazione output DB
        const safeUser = validationUsersToDB.parse(user);

        // 7. Genera JWT
        const payload = {
            id: safeUser.id,
            email: safeUser.email,
            role: safeUser.role,
        };

        const token = jwt.sign(payload, signToken, {
            expiresIn: "1h",
        });

        // 8. Imposta cookie HttpOnly
        const cookieStore = await cookies();
        cookieStore.set(tokenKey, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60,
        });

        // 9. Risposta finale
        return Response.json({
            success: true,
            user: publicUser,
            token,
        });

    } catch (error) {
        console.error("Errore nel login:", error);
        return Response.json({
            success: false,
            message: "Errore interno del server",
        }, { status: 500 });
    }
}
