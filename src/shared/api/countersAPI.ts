import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const countersAPI = createApi({
    reducerPath: 'countersAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000/counters` }),
    endpoints: (build) => ({
        getCounter: build.query<string, string>({
            query: (name) => ({
                url: `/${name}`,
                method: 'GET'
            })
        })
    })
});
