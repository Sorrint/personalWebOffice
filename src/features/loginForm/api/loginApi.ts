import { rtkApi } from '@shared/api/rtkApi'
import { type UserLoginDTO } from '../model/types/userLoginDTO'

export const loginApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<void, UserLoginDTO>({
            query: (user) => ({
                url: '/auth/login',
                method: 'Post',
                body: user,
                credentials: 'include'
            })
        })
    })
})

export const { useLoginMutation } = loginApi