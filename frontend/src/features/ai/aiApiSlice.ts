import { apiSlice } from "../api/apiSlice";

const aiApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder:any) => ({
        evaluate: builder.mutation({
            query: (data:any) => ({url: '/evaluate/', method: 'POST', body: {...data}})
        })
    })
})





export const {useEvaluateMutation} = aiApiSlice;