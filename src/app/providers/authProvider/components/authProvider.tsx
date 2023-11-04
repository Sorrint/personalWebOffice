import { useEffect, type ReactNode } from 'react';
import { useGetCurrenUserQuery } from '../api/authApi';
import {  useLocation, useNavigate } from 'react-router-dom';
import { routesLinks } from '@shared/config/router';

interface ErrorProviderProps {
    children: ReactNode
}
export const AuthProvider = ({children}: ErrorProviderProps) => {
    const {data, isLoading} = useGetCurrenUserQuery()
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const authPaths = ['login', 'register']
    const isAuthPath = authPaths.includes(pathname.split('/').at(-1) || '')
    
    useEffect(() => {
        if (!isLoading) {
            if (!data?.user && !isAuthPath) {
                return navigate(routesLinks.login.path);
            } else {
                return navigate(routesLinks.documents.path);
            }
        }
    }, [isLoading]);




    return children;
};