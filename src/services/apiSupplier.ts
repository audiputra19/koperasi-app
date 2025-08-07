import { createApi } from "@reduxjs/toolkit/query/react";
import type { getSupplierResponse, InputSuppRequest, InputSuppResponse } from "../interfaces/supplier";
import { baseQuery } from "./baseQuery";

export const apiSupplier = createApi({
    reducerPath: "apiSupplier",
    baseQuery,
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
        }),
        searchSupplier: build.query<getSupplierResponse[], string>({
            query: (keyword) => `/search-supplier?q=${keyword}` 
        })
    })
})

export const { useInputSupplierMutation, useGetSupplierQuery, useSearchSupplierQuery } = apiSupplier;