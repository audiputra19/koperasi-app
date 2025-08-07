import { createApi } from "@reduxjs/toolkit/query/react";
import type { PopulerRes, TableRes, TotalRes } from "../interfaces/dashboard";
import { baseQuery } from "./baseQuery";

export const apiDashboard = createApi({
    reducerPath: "apiDashboard",
    baseQuery,
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