import { rtkApi } from '@shared/api/rtkApi';

const logoutApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        logout: build.mutation<void, void> ({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            })
        })
    })
});

export const {useLogoutMutation} = logoutApi;

