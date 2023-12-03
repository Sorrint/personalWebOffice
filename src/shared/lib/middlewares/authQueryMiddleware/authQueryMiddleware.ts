import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { refreshAccessToken } from '../../helpers/refreshAccessToken';



const baseQuery = fetchBaseQuery({
    baseUrl: __SERVER_URI__,
    credentials: 'include',
    prepareHeaders: (headers) => {
        headers.set('authorization', `Bearer ${localStorage.getItem('dreamToken') ?? ''} `);
        return headers;
    },
})

export const baseQueryAuth: BaseQueryFn<
string | FetchArgs,
  unknown,
  FetchBaseQueryError
> =  async (args, api, extraOptions) => {
    let response = await baseQuery(args, api, extraOptions);
    const error = response.error?.data as FetchBaseQueryError
    if (typeof error === 'object' && 'message' in error && error.message === 'refresh') {
        const result = await refreshAccessToken()
        
        if (result.success){
            response = await baseQuery(args, api, extraOptions)
        } 
    }
    return  response;
}
