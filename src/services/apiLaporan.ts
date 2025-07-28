import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { getLaporanRequest, getLaporanResponse } from "../interfaces/laporan";


export const apiLaporan = createApi({
    reducerPath: "apiLaporan",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),
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