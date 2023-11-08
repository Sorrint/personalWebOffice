import { type User } from '@entities/users';
import { rtkApi } from '@shared/api/rtkApi';


const authApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getCurrenUser: build.query<User, void> ({
            query: () => ({
                url: '/users/current',
                method: 'GET',
            })
        })
    })
});

export const {useGetCurrenUserQuery} = authApi;

