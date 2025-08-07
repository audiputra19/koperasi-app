import { createApi } from "@reduxjs/toolkit/query/react";
import type { GetAksesRes } from "../interfaces/hakAkses";
import { baseQuery } from "./baseQuery";

export const apiAkses = createApi({
    reducerPath: 'apiAkses',
    baseQuery,
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