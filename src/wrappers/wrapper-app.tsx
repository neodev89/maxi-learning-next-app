"use client";

import React from "react";
import store from "@/redux-store/store";

import { JSX } from "@emotion/react/jsx-runtime";
import { muiCache } from "@/lib/emotion-cache";
import { CacheProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persister } from "@/redux-store";

// importa il tuo store e il persister

interface contentWrapperType {
    children: React.ReactElement;
}

export const ContentWrapper: React.FC<contentWrapperType> = ({ children }): JSX.Element => {
    return (
        <CacheProvider value={muiCache}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persister}>
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            height: "max-content",
                            width: "max-content",
                        }}
                    >
                        {children}
                    </div>
                </PersistGate>
            </Provider>
        </CacheProvider>
    );
};
