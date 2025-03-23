import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { RegistrationForm } from '@features/registrationForm';
import { LoginForm } from '@features/loginForm';
import { AuthContext } from '@shared/lib/context/AuthContext';

import styles from './Auth.module.scss';

export const Auth = () => {
  const location = useLocation();
  const route = location.pathname.split('/').at(-1);
  const isLoginPage = route === 'login';
  const { name, refetch } = useContext(AuthContext);
  if (name) return null;

  return (
    <>
      {isLoginPage ? (
        <LoginForm className={styles.form} onSuccess={refetch} />
      ) : (
        <RegistrationForm className={styles.form} onSuccess={refetch} />
      )}
    </>
  );
};
