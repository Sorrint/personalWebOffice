import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { memo } from 'react';

import { Button } from '@shared/ui/button';
import { TextField } from '@shared/ui/textField';
import { ErrorField } from '@shared/ui/errorField';
import { zodResolver } from '@hookform/resolvers/zod';

import { type UserLoginDTO } from '../model/types/userLoginDTO';
import { LoginSchema } from '../model/loginSchema';
import { useLoginMutation } from '../api/loginApi';
import styles from './loginForm.module.scss';
import { AppRoutes } from '@shared/config/router';
import { AppLink } from '@shared/ui/appLink';

interface LoginFormProps {
  className?: string;
  onSuccess?: () => void;
}

export const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserLoginDTO>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
  });
  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  const [loginUser] = useLoginMutation();

  const onSubmit = async (data: UserLoginDTO) => {
    try {
      const answer = await loginUser(data);
      if ('data' in answer) {
        onSuccess?.();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formStyle = classNames(styles.login, className);

  return (
    <div className={formStyle}>
      <div className={styles.header}>
        <h2 className={styles.title}>Вход</h2>
        <AppLink to={AppRoutes.getRegisterRoute()}>Зарегистрироваться</AppLink>
      </div>

      <div className={styles.field}>
        <TextField label='Введите email' variant='standard' {...register('email')} />
        <div className={styles.empty}>
          <ErrorField className={styles.error}>{emailError}</ErrorField>
        </div>
      </div>
      <div className={styles.field}>
        <TextField
          label='Введите пароль'
          variant='standard'
          type='password'
          {...register('password')}
        />
        <div className={styles.empty}>
          <ErrorField className={styles.error}>{passwordError}</ErrorField>
        </div>
      </div>

      <Button disabled={!isValid} onClick={handleSubmit(onSubmit)} className={styles.submit}>
        Войти
      </Button>
    </div>
  );
});

LoginForm.displayName = 'LoginForm';
