import { createApi } from "@reduxjs/toolkit/query/react";
import type { getLaporanRequest, getLaporanResponse } from "../interfaces/laporan";
import { baseQuery } from "./baseQuery";

export const apiLaporan = createApi({
    reducerPath: "apiLaporan",
    baseQuery,
    endpoints: build => ({
        getLaporan: build.mutation<getLaporanResponse[], getLaporanRequest>({
            query: body => ({
                url: '/get-laporan',
                method: 'POST',
                body
            })
        })
    })
});

export const { useGetLaporanMutation } = apiLaporan;