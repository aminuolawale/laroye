import { apiSlice } from "../api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query<any, void>({
            query: () => ({ url: '/users/account/', method: 'GET'})
        })
    })
})


export const { useGetUserQuery } = userApiSlice