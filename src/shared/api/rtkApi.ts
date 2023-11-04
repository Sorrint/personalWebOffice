import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryAuth } from '@shared/lib/middlewares/authQueryMiddleware';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryAuth,
    endpoints: () => ({})
});
