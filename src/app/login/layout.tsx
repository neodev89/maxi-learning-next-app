import { SoftwareAppJsonLd } from "@/lib/seo-ai/jsonld";
import type { Metadata } from "next";
import { ReactNode } from "react";

// export const metadata: Metadata = {
//   title: "Titolo pagina",
//   description: "Descrizione ottimizzata",
//   openGraph: {
//     title: "...",
//     description: "...",
//     url: "...",
//     images: ["..."],
//   }
// };

export const metadata: Metadata = {
    title: "pagina di login",
    description: "Pagina di accesso all'applicativo per lo studio di Next con Supabase e Drizzle",
}

export default function LoginLayout({
    children
}: Readonly<{
    children: ReactNode
}>) {

    const software = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Login",
        applicationCategory: "WebPage",
        operatingSystem: "All",
        url: "http://localhost:3000/login",
        description: "Pagina di accesso all'applicativo",
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }}
            />
            <div>
                {children}
            </div>
        </>
    )
}