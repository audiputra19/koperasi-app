import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { InputKasirRequest, InputKasirResponse } from "../interfaces/kasir";

export const apiKasir = createApi({
    reducerPath: "apiKasir",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),
    endpoints: build => ({
        inputKasir: build.mutation<InputKasirResponse, InputKasirRequest>({
            query: body => ({
                url: "/input-kasir",
                method: "POST",
                body
            })
        }),
    }),
})

export const { useInputKasirMutation } = apiKasir