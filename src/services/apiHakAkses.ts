import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GetAksesRes } from "../interfaces/hakAkses";

export const apiAkses = createApi({
    reducerPath: 'apiAkses',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    endpoints: build => ({
        getAkses: build.query<GetAksesRes[], void>({
            query: () => ({
                url: '/get-akses',
                method: 'POST'
            })
        }),
        updateHakAkses: build.mutation<void, { userId: number; feature: string; value: number }>({
            query: ({ userId, feature, value }) => ({
                url: `/update-akses/${userId}`,
                method: 'PATCH',
                body: { [feature]: value },
            }),
        })
    })
})

export const { useGetAksesQuery, useUpdateHakAksesMutation } = apiAkses;