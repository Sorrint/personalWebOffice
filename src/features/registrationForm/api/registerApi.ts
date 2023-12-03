import { rtkApi } from '@shared/api/rtkApi'
import { type UserRegisterDTO } from '../model/types/userRegisterDTO'

export const registerApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation<void, UserRegisterDTO>({
            query: (user) => ({
                url: '/auth/register',
                method: 'Post',
                body: user,
                credentials: 'include'
            })
        })
    })
})

export const { useRegisterMutation } = registerApi