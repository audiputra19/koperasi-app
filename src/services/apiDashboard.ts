import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PopulerRes, TableRes, TotalRes } from "../interfaces/dashboard";

export const apiDashboard = createApi({
    reducerPath: "apiDashboard",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api-koperasi-psi.vercel.app"
        //baseUrl: "http://localhost:3001"
    }),
    endpoints: build => ({
        getTotalAnggota: build.query<TotalRes, void>({
            query: () => ({
                url: "/get-total-anggota",
                method: "POST"
            })
        }),
        getTotalSupplier: build.query<TotalRes, void>({
            query: () => ({
                url: "/get-total-supplier",
                method: "POST"
            })
        }),
        getTotalItem: build.query<TotalRes, void>({
            query: () => ({
                url: "/get-total-item",
                method: "POST"
            })
        }),
        getLimitItem: build.query<TableRes[], void>({
            query: () => ({
                url: "/get-limit-item",
                method: "POST"
            })
        }),
        getExpiredItem: build.query<TableRes[], void>({
            query: () => ({
                url: "/get-expired-item",
                method: "POST"
            })
        }),
        getPopulerItem: build.query<PopulerRes[], void>({
            query: () => ({
                url: "/get-populer-item",
                method: "POST"
            })
        }),
        getMostBuyer: build.query<PopulerRes[], void>({
            query: () => ({
                url: "/get-most-buyer",
                method: "POST"
            })
        }),
    }),
});

export const { useGetTotalAnggotaQuery, useGetTotalSupplierQuery, useGetTotalItemQuery, 
            useGetLimitItemQuery, useGetExpiredItemQuery, useGetPopulerItemQuery,
            useGetMostBuyerQuery } = apiDashboard;