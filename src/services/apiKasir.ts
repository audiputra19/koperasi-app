import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GetKasirDetailRequest, GetKasirDetailResponse, GetKasirResponse, InputKasirRequest, InputKasirResponse, UpdateKasirRequest, UpdateKasirResponse } from "../interfaces/kasir";

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
        updateKasir: build.mutation<UpdateKasirResponse, UpdateKasirRequest>({
            query: body => ({
                url: "/update-kasir",
                method: "POST",
                body
            })
        }),
        getKasir: build.query<GetKasirResponse[], void>({
            query: () => ({
                url: "/get-kasir",
                method: "POST"
            })
        }),
        getKasirDetail: build.mutation<GetKasirDetailResponse[], GetKasirDetailRequest>({
            query: body => ({
                url: "/get-kasirdetail",
                method: "POST",
                body
            })
        }), 
    }),
})

export const { useInputKasirMutation, useUpdateKasirMutation, useGetKasirQuery, useGetKasirDetailMutation } = apiKasir