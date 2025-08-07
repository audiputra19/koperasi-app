import { createApi } from "@reduxjs/toolkit/query/react";
import type { GetPelangganResponse, InputPelangganRequest, InputPelangganResponse } from "../interfaces/pelanggan";
import { baseQuery } from "./baseQuery";

export const apiPelanggan = createApi({
    reducerPath: "apiPelanggan",
    baseQuery,
    endpoints: build => ({
        getPelanggan: build.query<GetPelangganResponse[], void>({
            query: () => ({
                url: "/get-pelanggan",
                method: "POST"
            })
        }),
        inputPelanggan: build.mutation<InputPelangganResponse, InputPelangganRequest>({
            query: body => ({
                url: "/input-pelanggan",
                method: "POST",
                body
            })
        }),
        searchPelanggan: build.query<GetPelangganResponse[], string>({
            query: (keyword) => `/search-pelanggan?q=${keyword}` 
        })
    })
})

export const { useGetPelangganQuery, useInputPelangganMutation, useSearchPelangganQuery } = apiPelanggan;