import { rtkApi } from '@shared/api/rtkApi'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '../api/logoutApi'
import { useContext } from 'react'
import { AuthContext } from '@shared/lib/context/authContext'

export const useLogout = () => {
    const { refetch} = useContext(AuthContext)
    const [logout] = useLogoutMutation()
    const dispatch = useDispatch()
    const handleLogout = async () => {
        const answer = await logout()
        if ('data' in answer && answer?.data === null) {
            dispatch(rtkApi.util.resetApiState())
            refetch?.()
        }
    }
    return { logout: handleLogout }
}