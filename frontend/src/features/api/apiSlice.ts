import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../../app/store'
import { addErrors } from '../errors/errorsSlice'

type Error = {
    status: string;
    originalStatus?: number;
    data?: string;
    error?: string;
}

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_ENV ==='dev'?"http://localhost:8000/api":'http://laroye.ai/api/api',
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.accessToken
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`)
            headers.set('Content-Type', "application/json")
            headers.set('Access-Control-Allow-Private-Network', "true")
        }
        return headers
    },
})



const baseQueryWrapper = async(args:any, api:any, extraOptions:any) => {
    console.log("_______>>>", process.env.REACT_APP_ENV)
    let result = await baseQuery(args, api, extraOptions) 
    const error = result.error as Error
    const statusString = error?.originalStatus?.toString()||""
    if (statusString.startsWith('5') || statusString==='404'){
        api.dispatch(addErrors(["Could not reach server"]))
    }
    return result;
}


export const apiSlice = createApi({
    baseQuery: baseQueryWrapper,

    endpoints: builder => ({})
})