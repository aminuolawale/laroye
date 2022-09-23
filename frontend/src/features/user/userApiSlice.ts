import { apiSlice } from "../api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query<any, void>({
            query: () => ({ url: '/users/account/', method: 'GET'})
        }),
        linkSocialAccount: builder.mutation({
            query: data => ({
                url:'/users/link-social-account/',
                method: 'POST',
                body: {...data}
            })
        }),
        getSocialAccounts: builder.query<any, void>({
            query: () => ({
                url:'/users/link-social-account/', method: 'GET'
            })
        }),
        importData: builder.mutation({
            query:data => ({
                url: '/users/import-social-data/',
                method: 'POST',
                body: {...data}
            })
        })
    })
})


export const { useGetUserQuery, useLinkSocialAccountMutation, useGetSocialAccountsQuery, useImportDataMutation } = userApiSlice