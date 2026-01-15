import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { db } from "@/db";
import { formSignInInstance, validationUsersToDB } from "@/zod/formSignIn";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

const signToken = process.env.SIGNATURE_TOKEN!;

export async function POST(req: NextRequest) {
    try {
        const dati = await req.json();

        // 1. Validazione input
        const parsed = formSignInInstance.parse(dati);

        // 2. Cerca utente nel DB
        const user = await db.query.loginApp.findFirst({
            where: (table, { eq }) => eq(table.email, parsed.email),
        });

        // 3. Risposta se utente non trovato
        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'Credenziali non valide',
            }, { status: 401 });
        }

        // 4. Verifica password
        const passwordCorretta = await bcrypt.compare(
            parsed.password,
            user.password,
        );

        if (!passwordCorretta) {
            return NextResponse.json({
                success: false,
                message: 'Credenziali non valide',
            }, { status: 401 });
        }

        // 5. Validazione output DB
        const safeUser = validationUsersToDB.parse(user);

        // 6. Rimuovi password
        const { password, ...publicUser } = safeUser;

        // 7. Genera JWT
        const payload = {
            id: publicUser.id,
            email: publicUser.email,
            role: publicUser.role,
        };

        const token = jwt.sign(payload, signToken, {
            expiresIn: "1h",
        });

        // 8. Imposta cookie HttpOnly
        const cookiesStore = await cookies();
        cookiesStore.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60,
        });

        // 9. Risposta finale
        return NextResponse.json({
            success: true,
            user: publicUser,
            token,
        });

    } catch (error) {
        console.error("Errore nel login:", error);
        return NextResponse.json({
            success: false,
            message: "Errore interno del server",
        }, { status: 500 });
    }
}
