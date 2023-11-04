import { useLocation } from 'react-router-dom';
import styles from './auth.module.scss';
import { LoginForm } from '@features/loginForm';
import { RegistrationForm } from '@features/registrationForm';


export const Auth = () => {
    const {pathname} = useLocation()
    const route = pathname.split('/').at(-1)
    const isLoginPage = route === 'login' 

    return <>
        {
            isLoginPage 
                ? <LoginForm classname={styles.form}/> 
                : <RegistrationForm classname={styles.form}/>
        }
    </>;
};