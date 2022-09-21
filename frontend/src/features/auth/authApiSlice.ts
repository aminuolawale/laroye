import { apiSlice } from "../api/apiSlice";


const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signup: builder.mutation({
            query: data => ({
                url: '/auth/registration/',
                method: 'POST',
                body: { ...data }
            })
        }),
        login: builder.mutation({
            query: data => ({
                url: '/auth/login/',
                method: 'POST',
                body: { ...data },
            })
        }),
    })
})


export const { useSignupMutation, useLoginMutation } = authApiSlice;