import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tokenSlice, tokenType } from "./tokenSlice";
import { storagePersist } from "@/lib/persist-config";


const tokenConfig: PersistConfig<tokenType> = {
    key: "token-slice",
    storage: storagePersist,
    whitelist: ["current", "history"],
};

const rootReducer = combineReducers({
    token: persistReducer(tokenConfig, tokenSlice.reducer),
});

export const persistor = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }
    ),
});

export const persister = persistStore(persistor);
export type RootState = ReturnType<typeof persistor.getState>;
export type AppDispatch = typeof persistor.dispatch;
export default persistor;

