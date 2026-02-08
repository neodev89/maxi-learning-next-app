import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface tokenType {
    current: string;
    history: string[];
}

const initialState: tokenType = {
    current: "",
    history: [],
};

export const tokenSlice = createSlice({
    name: "token-slice",
    initialState,
    reducers: {
        setTokenState: (state, action: PayloadAction<string>) => {
            state.current = action.payload,
            state.history.push(action.payload)
        },
        updateTokenState: (state, action: PayloadAction<string>) => {
            if (state.current !== action.payload) {
                state.current = action.payload
            }
        },
        removeTokenState: (state, action: PayloadAction<string>) => {
            if (state.current === action.payload) {
                state.current = ""
            }
        },
    }
});

export const {
    setTokenState,
    updateTokenState,
    removeTokenState,
} = tokenSlice.actions;

export default tokenSlice.reducer;