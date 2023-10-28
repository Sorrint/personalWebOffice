import { memo } from 'react';

import { Button } from '@shared/ui/button';
import { TextField } from '@shared/ui/textField';
import { zodResolver } from '@hookform/resolvers/zod'

import styles from './registrationForm.module.scss'
import { useForm } from 'react-hook-form';
import { RegisterSchema } from '../model/registrationSchema';

interface RegistrationFormProps {
    classname?: string
}

interface UserRegisterDTO {
    email: string
    password: string
}

export const RegistrationForm = memo((props: RegistrationFormProps) => {
    const {register, handleSubmit} = useForm<UserRegisterDTO>({mode: 'onChange', resolver: zodResolver(RegisterSchema)})
    
    const onSubmit = (data: UserRegisterDTO) => {
        console.log(data)
    }
 
    return <div className={styles.register}>
        <h2>РЕГИСТРАЦИЯ</h2>
        <TextField 
            label='Введите email'
            variant='standard'
            {...register('email')}
        />
        <TextField 
            label='Введите пароль'
            variant='standard'
            type='password'
            {...register('password')}
        />
        <Button onClick={handleSubmit(onSubmit)} >Зарегистрироваться</Button>
    </div>;
});