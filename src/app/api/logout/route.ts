import { cookies } from "next/headers";

const tokenKey = process.env.TOKEN_KEY!;

export async function POST() {
    try {
        const cookieStore = await cookies();

        cookieStore.set(
            tokenKey,
            "",
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 0,
            }
        );
        console.log("I dati cancellati sono: ", cookieStore.get(tokenKey));
        return Response.json({ 
            success: true, 
            message: "Logout effettuato", 
            status: 200 
        });

    } catch (error: any) {
        console.error(error);
        return Response.json(error.message);
    }
}