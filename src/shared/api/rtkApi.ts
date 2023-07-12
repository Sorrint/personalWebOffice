import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: __SERVER_URI__,
        prepareHeaders: (headers) => {
            const dataBase = localStorage.getItem('dataBase') ?? '';
            if (dataBase === 'dreamkasStorage') {
                headers.set('authorization', `Bearer ${localStorage.getItem('dreamToken') ?? ''} `);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({})
});
