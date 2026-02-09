'use client'

import instance from "@/axios/instance";
import { useEffect, useState } from "react";

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const prefs = document.cookie
            .split("; ")
            .find(row => row.startsWith("privacy_preferences="));

        if (!prefs) {
            setVisible(true);
        }
    }, []);

    const acceptAll = async () => {
        await instance.post("/api/privacy", {
            necessary: true,
            functional: true,
            marketing: true
        });

        setVisible(false);
    };

    const rejectAll = async () => {
        await instance.post("/api/privacy", {
            necessary: true,
            functional: false,
            marketing: false
        });

        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex justify-between items-center">
            <p>Usiamo cookie per migliorare l’esperienza. Puoi accettare o rifiutare.</p>
            <div className="flex gap-2">
                <button onClick={rejectAll} className="px-3 py-1 bg-gray-700 rounded">
                    Rifiuta
                </button>
                <button onClick={acceptAll} className="px-3 py-1 bg-blue-600 rounded">
                    Accetta tutto
                </button>
            </div>
        </div>
    );
}