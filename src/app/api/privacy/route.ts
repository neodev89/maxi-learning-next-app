import { cookies } from "next/headers";

const privacyPreference = process.env.PRIVACY_PREFERENCE!;

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const cookiesPrivacy = await cookies();
        cookiesPrivacy.set(
            privacyPreference,
            JSON.stringify(body),
            {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 0 * 60 * 24 * 365,
            }
        );

        return Response.json({
            success: true,
            message: "Preferenze salvate",
        });

    } catch (error: any) {
        console.error("Errore nel salvataggio delle preferenze dei cookies");
        return Response.json({
            success: false,
            status: 505,
        });
    }
}