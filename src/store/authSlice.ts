import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginResponse } from "../interfaces/auth";

const initialState: LoginResponse = {
    token: undefined
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<LoginResponse>) => {
            state.token = action.payload.token;
        },
        clearToken: (state) => {
            state.token = undefined;
        }
    }
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;