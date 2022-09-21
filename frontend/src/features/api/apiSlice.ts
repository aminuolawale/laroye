import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../../app/store'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
        prepareHeaders: (headers, { getState }) => {
            const accessToken = (getState() as RootState).auth.accessToken
            if (accessToken) {
                headers.set("Authorization", `Bearer ${accessToken}`)
                headers.set('Content-Type', "application/json")
            }
            return headers
        },
    }),
    endpoints: (builder) => ({}),
})