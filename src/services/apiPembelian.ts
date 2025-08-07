import { createApi } from "@reduxjs/toolkit/query/react";
import type { DeletePembelianDetailRequest, DeletePembelianDetailResponse, DeletePembelianRequest, DeletePembelianResponse, GetPembelianDetailRequest, GetPembelianDetailResponse, GetPembelianResponse, InputPembelianRequest, InputPembelianResponse, UpdatePembelianRequest, UpdatePembelianResponse } from "../interfaces/pembelian";
import { baseQuery } from "./baseQuery";

export const apiPembelian = createApi({
    reducerPath: "apiPembelian",
    baseQuery,
    endpoints: build => ({
        inputPembelian: build.mutation<InputPembelianResponse, InputPembelianRequest>({
            query: body => ({
                url: "/input-pembelian",
                method: "POST",
                body
            })
        }),
        updatePembelian: build.mutation<UpdatePembelianResponse, UpdatePembelianRequest>({
            query: body => ({
                url: "/update-pembelian",
                method: "POST",
                body
            })
        }),
        getPembelian: build.query<GetPembelianResponse[], void>({
            query: () => ({
                url: "/get-pembelian",
                method: "POST"
            })
        }),
        getPembelianDetail: build.mutation<GetPembelianDetailResponse[], GetPembelianDetailRequest>({
            query: body => ({
                url: "/get-pembeliandetail",
                method: "POST",
                body
            })
        }),
        deletePembelian: build.mutation<DeletePembelianResponse, DeletePembelianRequest>({
            query: body => ({
                url: "/delete-pembelian",
                method: "POST",
                body
            }) 
        }),
        deletePembelianDetail: build.mutation<DeletePembelianDetailResponse, DeletePembelianDetailRequest>({
            query: body => ({
                url: "/delete-pembeliandetail",
                method: "POST",
                body
            }) 
        })
    }),
})

export const { useInputPembelianMutation, useUpdatePembelianMutation, useGetPembelianQuery, useGetPembelianDetailMutation, useDeletePembelianMutation, useDeletePembelianDetailMutation } = apiPembelian