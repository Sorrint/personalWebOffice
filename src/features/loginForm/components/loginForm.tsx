import { memo } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@shared/ui/button';
import { TextField } from '@shared/ui/textField';
import { ErrorField } from '@shared/ui/errorField';
import { zodResolver } from '@hookform/resolvers/zod'

import styles from './registrationForm.module.scss'
import { type UserLoginDTO } from '../model/types/userLoginDTO';
import { LoginSchema } from '../model/loginSchema';
import { useLoginMutation } from '../api/loginApi';

interface LoginFormProps {
    classname?: string
}

export const LoginForm = memo((props: LoginFormProps) => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<UserLoginDTO>({
        mode: 'onChange', 
        resolver: zodResolver(LoginSchema)
    })
    
    const emailError = errors.email?.message
    const passwordError = errors.password?.message


    const [registerUser] = useLoginMutation()

    const onSubmit = async (data: UserLoginDTO) => {
        const answer = await registerUser(data)
        console.log(answer)
    }
 
    return <div className={styles.register}>
        <h2>Вход</h2>
 
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
            Войти
        </Button>
    </div>;
});