import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { getItemResponse, inputItemRequest, inputItemResponse } from "../interfaces/items";

export const apiItems = createApi({
    reducerPath: "apiItems",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),
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
        searchItems: build.query<getItemResponse[], string>({
            query: (keyword) => `/search-items?q=${keyword}`,
        })
    }),
});

export const { useGetItemsQuery, useInputItemsMutation, useSearchItemsQuery } = apiItems;