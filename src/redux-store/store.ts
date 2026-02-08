import { configureStore } from "@reduxjs/toolkit";
import tokenStateSlice from "./tokenSlice";

const store = configureStore({
    reducer: {
        tokenState: tokenStateSlice,
    }
});

export default store;
export type RootStore = ReturnType<typeof store.getState>;