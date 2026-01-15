"use client"
import React from "react";
import { JSX } from "@emotion/react/jsx-runtime";
import { muiCache } from "@/lib/emotion-cache";
import { CacheProvider } from "@emotion/react";

interface contentWrapperType {
    children: React.ReactElement;
}

export const ContentWrapper: React.FC<contentWrapperType> = ({ children }): JSX.Element => {
    return (
        <CacheProvider value={muiCache}>
            <div style={{
                position: 'relative',
                display: 'flex',
                height: 'max-content',
                width: 'max-content',
            }}>
                {children}
            </div>
        </CacheProvider>
    )
}