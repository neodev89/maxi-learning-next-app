import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { v4 as ID } from 'uuid';
import { formSignInInstance, validationUsersToDB } from "@/zod/formSignIn";
import { db } from '@/db';
import { registerApp } from '@/db/schema/registerApp';
import { cookies } from 'next/headers';


const signToken = process.env.SIGNATURE_TOKEN!;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const uniqueID = ID();
        const now = new Date();
        const update = now;
        const verified = true;

        // 1. Input validation
        const parsed = formSignInInstance.parse(body);

        const justRegistered = await db.query.loginApp.findFirst({
            where: (table, { eq }) => eq(table.email, parsed.email)
        });

        if (justRegistered) {
            return Response.json({
                success: true,
                message: 'Utente già registrato',
                status: 409,
            }, { status: 409 });
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(parsed.password, 15);

        // 3. Recognize user's role
        const role = parsed.email.includes('mgc') ? 'admin' : 'user';

        // 4. Add in DB
        const [user] = await db.insert(registerApp).values({
            id: uniqueID,
            email: parsed.email,
            password: hashedPassword,
            createdAt: now.toString(),
            updatedAt: update.toString(),
            emailVerified: verified,
            role: role,
        }).returning();

        const { password, ...other } = user;
        // 5. Validate DB output
        const validateUser = validationUsersToDB.parse(other);

        // 7. Genera JWT
        const payload = {
            id: validateUser.id,
            email: validateUser.email,
            role: validateUser.role,
        };

        const token = jwt.sign(payload, signToken, {
            expiresIn: "1h",
        });

        // 8. Imposta cookie HttpOnly
        const cookieStore = await cookies();
        cookieStore.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60,
        });

        return Response.json({
            success: true,
            user: validateUser,
            status: 201,
            token,
        }, { status: 201 });

    } catch (error) {
        console.error("Errore nella registrazione:", error);
        return Response.json({
            success: false,
            message: "Errore interno del server",
            status: 500,
        }, { status: 500 });
    }
};