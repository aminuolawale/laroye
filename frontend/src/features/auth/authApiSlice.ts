import { apiSlice } from "../api/apiSlice";


const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        socialLogin: builder.mutation({
            query: data => ({
                url: '/auth/social-login/',
                method: 'POST',
                body: {...data}
            })
        })
    })
})


export const { useSocialLoginMutation} = authApiSlice;