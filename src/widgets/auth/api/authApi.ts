import { rtkApi } from '@shared/api/rtkApi';


const authApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getCurrenUser: build.query<{user: string}, void> ({
            query: () => ({
                url: '/users/current',
                method: 'GET',
            })
        })
    })
});

export const {useGetCurrenUserQuery} = authApi;

