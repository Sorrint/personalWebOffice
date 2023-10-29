import { z } from 'zod';

const RegErrors = {
    email: 'Некорректный email',
    pass_required: 'Пароль обязателен для заполнения',
    pass_length: 'Длина пароля должна быть не меньше 6 символов',
    pass_capital: 'Пароль должен содержать хотя бы одну заглавную букву',
    pass_number: 'Пароль должен содержать хотя бы одну цифру',
    name_required: 'Имя пользователя обязательно',
    name_length: 'Длина имени не менее 4 символов'
}

export const RegisterSchema = z.object({
    email: z.string().email({message: RegErrors.email}),
    password: z.string()
        .regex(/^.+$/, { message: RegErrors.pass_required })
        .regex(/[A-Z]/, { message: RegErrors.pass_capital })
        .regex(/\d/, { message: RegErrors.pass_number })
        .min(6, {message: RegErrors.pass_length}),
    name: z.string()
        .regex(/^.+$/, { message: RegErrors.name_required })
        .min(4, {message: RegErrors.name_length})
});