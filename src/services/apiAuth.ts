import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import type { LoginRequest, LoginResponse, AuthState, MeState, MeResponse } from "../interfaces/auth";

const baseQuery = fetchBaseQuery({
    // baseUrl: "https://api-koperasi-psi.vercel.app/auth",
    baseUrl: "http://localhost:3001/auth",
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token;
        if(token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

export const apiAuth = createApi({
    reducerPath: "apiAuth",
    baseQuery,
    endpoints: build => ({
        postLogin: build.mutation<AuthState<LoginResponse>, LoginRequest>({
            query: body => ({
                url: "/login",
                method: "POST",
                body
            })
        }),
        postMe: build.query<MeState<MeResponse>, void>({
            query: () => ({
                url: "/me",
                method: "POST"
            })
        })
    })
});

export const { usePostLoginMutation, usePostMeQuery } = apiAuth;