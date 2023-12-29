import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { memo } from 'react';

import { Button } from '@shared/ui/button';
import { TextField } from '@shared/ui/textField';
import { ErrorField } from '@shared/ui/errorField';
import { zodResolver } from '@hookform/resolvers/zod'

import { type UserRegisterDTO } from '../model/types/userRegisterDTO';
import { RegisterSchema } from '../model/registrationSchema';
import { useRegisterMutation } from '../api/registerApi';
import styles from './registrationForm.module.scss'
import { AppLink } from '@shared/ui/appLink';
import { AppRoutes } from '@shared/config/router';

interface RegistrationFormProps {
    classname?: string
    onSuccess?: () => void
}

export const RegistrationForm = memo(({classname, onSuccess}: RegistrationFormProps) => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<UserRegisterDTO>({
        mode: 'onChange', 
        resolver: zodResolver(RegisterSchema)
    })
    
    const emailError = errors.email?.message
    const passwordError = errors.password?.message
    const nameError = errors.name?.message


    const [registerUser] = useRegisterMutation()

    const onSubmit = async (data: UserRegisterDTO) => {
        try {
            const answer = await registerUser(data)
            if ('data' in answer) {
                onSuccess?.()
            }
        } catch (error) {
            console.log(error)            
        }
        
    }
    
    const formStyle = classNames(styles.register, classname)
 
    return <div className={formStyle}>
        <div className={styles.header}>
            <h2 className={styles.title}>Регистрация</h2>
            <AppLink to={AppRoutes.getLoginRoute()}>Войти</AppLink>
        </div>
        <div className={styles.field}>
            <TextField 
                label='Имя пользователя'
                variant='standard'
                {...register('name')}
            />
            <div className={styles.empty}>
                <ErrorField classname={styles.error}>{nameError}</ErrorField>
            </div>
        </div>
        <div className={styles.field}>
            <TextField 
                label='Введите email'
                variant='standard'
                {...register('email')}
            />
            <div className={styles.empty}>
                <ErrorField classname={styles.error}>{emailError}</ErrorField>
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
                <ErrorField classname={styles.error}>{passwordError}</ErrorField>
            </div>
        </div>
        
        <Button 
            disabled={!isValid} 
            onClick={handleSubmit(onSubmit)} 
            classname={styles.submit}
        >
            Зарегистрироваться
        </Button>
    </div>;
});