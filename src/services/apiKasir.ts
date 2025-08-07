import { createApi } from "@reduxjs/toolkit/query/react";
import type { DeleteKasirDetailRequest, DeleteKasirDetailResponse, DeleteKasirRequest, DeleteKasirResponse, GetKasirDetailRequest, GetKasirDetailResponse, GetKasirResponse, InputKasirRequest, InputKasirResponse, UpdateKasirRequest, UpdateKasirResponse } from "../interfaces/kasir";
import { baseQuery } from "./baseQuery";

export const apiKasir = createApi({
    reducerPath: "apiKasir",
    baseQuery,
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
        deleteKasir: build.mutation<DeleteKasirResponse, DeleteKasirRequest>({
           query: body => ({
                url: "/delete-kasir",
                method: "POST",
                body
           }) 
        }),
        deleteKasirDetail: build.mutation<DeleteKasirDetailResponse, DeleteKasirDetailRequest>({
           query: body => ({
                url: "/delete-kasirdetail",
                method: "POST",
                body
           }) 
        }) 
    }),
})

export const { useInputKasirMutation, useUpdateKasirMutation, useGetKasirQuery, useGetKasirDetailMutation, useDeleteKasirMutation, useDeleteKasirDetailMutation } = apiKasir