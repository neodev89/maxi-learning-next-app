import bcrypt from 'bcrypt';

import { v4 as ID } from 'uuid';
import { formSignInInstance, validationUsersToDB } from "@/zod/formSignIn";
import { NextRequest, NextResponse } from "next/server";
import { db } from '@/db';
import { loginApp } from '@/db/schema/loginApp';

export async function POST(req: NextRequest) {
    try {
        const dati = await req.json();
        const uniqueID = ID();

        // 1. Input validation
        const parsed = formSignInInstance.parse(dati);

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(parsed.password, 15);

        // 3. Recognize user's role
        const role = parsed.email.includes('mgc') ? 'admin' : 'user';

        // 4. Add in DB
        const [user] = await db.insert(loginApp).values({
            id: uniqueID,
            email: parsed.email,
            password: hashedPassword,
            role: role,
        }).returning();

        // 5. Validate DB output
        const validateUser = validationUsersToDB.parse(user);

        // 6. remove password for client
        const { password, ...other } = validateUser;

        // 7. Then
        return NextResponse.json({
            success: true,
            user: other,
        }, { status: 201 });

    } catch (error) {
        console.error("Errore nella registrazione:", error);
        return NextResponse.json({
            success: false,
            message: "Errore interno del server",
        }, { status: 500 });
    }
};