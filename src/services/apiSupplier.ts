import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { getSupplierResponse, InputSuppRequest, InputSuppResponse } from "../interfaces/supplier";

export const apiSupplier = createApi({
    reducerPath: "apiSupplier",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),
    endpoints: build => ({
        inputSupplier: build.mutation<InputSuppResponse, InputSuppRequest>({
            query: body => ({
                url: "/input-supplier",
                method: "POST",
                body
            })
        }),
        getSupplier: build.query<getSupplierResponse[], void>({
            query: () => ({
                url: "/get-supplier",
                method: "POST"
            })
        })
    })
})

export const { useInputSupplierMutation, useGetSupplierQuery } = apiSupplier;