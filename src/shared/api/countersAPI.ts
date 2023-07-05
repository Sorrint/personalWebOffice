import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { SERVER_URI } from '@app/config/apiConfig';

export const countersAPI = createApi({
    reducerPath: 'countersAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `http://${SERVER_URI}/counters` }),
    tagTypes: ['counter'],
    endpoints: (build) => ({
        getCounter: build.query<string, string>({
            query: (name) => ({
                url: `/${name}`,
                method: 'GET'
            })
        })
    })
});
