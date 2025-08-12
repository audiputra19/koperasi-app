import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
    baseUrl: "https://api-koperasi-psi.vercel.app"
    // baseUrl: "http://localhost:3001"
});