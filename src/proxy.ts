import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const signToken = process.env.SIGNATURE_TOKEN!;

export function proxy(req: NextRequest) {
    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    try {
        const payload = jwt.verify(
            token,
            signToken
        ); // Ora hai accesso al ruolo 
        if (typeof payload === "string") { throw new Error("Token non valido"); }
        const role = payload.role; // E puoi proteggere route specifiche 
        console.log("Il payload del token è :", payload);
        if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
            return NextResponse.redirect(
                new URL("/unauthorized", req.url)
            );
        }
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(
            new URL("/login", req.url)
        );
    }
};

export const config = {
    matcher: ["/dashboard/:path*"],
};