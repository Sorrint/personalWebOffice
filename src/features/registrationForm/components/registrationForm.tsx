import { memo } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@shared/ui/button';
import { TextField } from '@shared/ui/textField';
import { ErrorField } from '@shared/ui/errorField';
import { zodResolver } from '@hookform/resolvers/zod'

import { RegisterSchema } from '../model/registrationSchema';
import styles from './registrationForm.module.scss'

interface RegistrationFormProps {
    classname?: string
}

interface UserRegisterDTO {
    email: string
    password: string
}

export const RegistrationForm = memo((props: RegistrationFormProps) => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<UserRegisterDTO>({mode: 'onChange', resolver: zodResolver(RegisterSchema)})
    
    const emailError = errors.email?.message
    const passwordError = errors.password?.message


    const onSubmit = (data: UserRegisterDTO) => {
        console.log(data)
    }
 
    return <div className={styles.register}>
        <h2>РЕГИСТРАЦИЯ</h2>
        <div className={styles.field}>
            <TextField 
                label='Введите email'
                variant='standard'
                {...register('email')}
            />
            <ErrorField>{emailError}</ErrorField>
        </div>
        <div className={styles.field}>
            <TextField 
                label='Введите пароль'
                variant='standard'
                type='password'
                {...register('password')}
            />
            <ErrorField>{passwordError}</ErrorField>
        </div>
        <Button disabled={!isValid} onClick={handleSubmit(onSubmit)} >Зарегистрироваться</Button>
    </div>;
});