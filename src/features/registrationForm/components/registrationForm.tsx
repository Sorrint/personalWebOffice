import { memo } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@shared/ui/button';
import { TextField } from '@shared/ui/textField';
import { ErrorField } from '@shared/ui/errorField';
import { zodResolver } from '@hookform/resolvers/zod'

import { type UserRegisterDTO } from '../model/types/userRegisterDTO';
import { RegisterSchema } from '../model/registrationSchema';
import { useRegisterMutation } from '../api/registerApi';
import styles from './registrationForm.module.scss'
import classNames from 'classnames';

interface RegistrationFormProps {
    classname?: string
}

export const RegistrationForm = memo(({classname}: RegistrationFormProps) => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<UserRegisterDTO>({
        mode: 'onChange', 
        resolver: zodResolver(RegisterSchema)
    })
    
    const emailError = errors.email?.message
    const passwordError = errors.password?.message
    const nameError = errors.name?.message


    const [registerUser] = useRegisterMutation()

    const onSubmit = async (data: UserRegisterDTO) => {
        const answer = await registerUser(data)
        console.log(answer)
    }
    
    const formStyle = classNames(styles.register, classname)
 
    return <div className={formStyle}>
        <h2>РЕГИСТРАЦИЯ</h2>
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