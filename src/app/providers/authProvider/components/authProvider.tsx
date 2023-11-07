import { type ReactNode } from 'react';
import {  Navigate, useLocation } from 'react-router-dom';
import { routesLinks } from '@shared/config/router';
import { useGetCurrenUserQuery } from '@widgets/auth';
import { AuthContext } from '@shared/lib/context/authContext';

interface ErrorProviderProps {
    children: ReactNode
}
export const AuthProvider = ({children}: ErrorProviderProps) => {
    const {data, isLoading, refetch} = useGetCurrenUserQuery()
    const location = useLocation()
    const from = location.state?.from?.pathname
    const authPaths = ['login', 'register']
    const isAuthPath = authPaths.includes(location.pathname.split('/').at(-1) || '')

    if (!isLoading) {
        if (!data?.user && !isAuthPath) {
            return <Navigate to={routesLinks.login.path} state={{ from: location }}/>;
        } 
    }

    if (data?.user && isAuthPath) {
        return <Navigate to={from || routesLinks.documents.path} state={{ from: location }} replace/>
    }

    if (isLoading) return null
    return <AuthContext.Provider value={{user: data?.user, refetch}}> 
        {children}
    </AuthContext.Provider>;
};