import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { RegistrationForm } from '@features/registrationForm';
import { LoginForm } from '@features/loginForm';
import { AuthContext } from '@shared/lib/context/authContext';

import styles from './auth.module.scss';


export const Auth = () => {
    const location = useLocation()
    const route = location.pathname.split('/').at(-1)
    const isLoginPage = route === 'login' 
    const {user, refetch}= useContext(AuthContext)
    if (user) return null

    return <>
        {
            isLoginPage 
                ? <LoginForm 
                    classname={styles.form} 
                    onSuccess={refetch}
                /> 
                : <RegistrationForm 
                    classname={styles.form} 
                    onSuccess={refetch}
                />
        }
    </>;
};