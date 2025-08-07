import { createApi } from "@reduxjs/toolkit/query/react";
import type { getItemResponse, inputItemRequest, inputItemResponse } from "../interfaces/items";
import type { GetKasirDetailResponse } from "../interfaces/kasir";
import { baseQuery } from "./baseQuery";

export const apiItems = createApi({
    reducerPath: "apiItems",
    baseQuery,
    endpoints: build => ({
        getItems: build.query<getItemResponse[], void>({
            query: () => ({
                url: "/get-items",
                method: "POST"
            })
        }),
        inputItems: build.mutation<inputItemResponse, inputItemRequest>({
            query: body => ({
                url: "/input-items",
                method: "POST",
                body
            })
        }),
        searchItems: build.query<GetKasirDetailResponse[], string>({
            query: (keyword) => `/search-items?q=${keyword}`,
        })
    }),
});

export const { useGetItemsQuery, useInputItemsMutation, useSearchItemsQuery } = apiItems;