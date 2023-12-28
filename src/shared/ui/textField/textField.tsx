import { useState, forwardRef, type ForwardedRef, type KeyboardEvent, memo } from 'react';
import { type FieldValues, type Path } from 'react-hook-form';
import classNames from 'classnames';

import styles from './textField.module.scss';
import { IconFont } from '../iconFont';

export type ITextFieldType = 'text' | 'number' | 'password' | 'email' | 'tel'
export interface ITextFieldsProps<T extends FieldValues> {
    label?: string
    name: Path<T>
    type?: ITextFieldType
    autoComplete?: string
    variant?: 'standard' | 'outline'
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (e: KeyboardEvent) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    className?: string
}

export const TextField = memo(forwardRef(function TextField<T extends FieldValues> (
    props: ITextFieldsProps<T>,
    ref: ForwardedRef<HTMLInputElement | null>
) {
    const { label, name, type, autoComplete, onChange, onKeyDown, variant = 'outline', onFocus, className } = props;
    const [showPassword, setShowPassword] = useState(false);
 
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const id = `${name}-${new Date().getTime()}`
    const inputClass = classNames(styles['input-group'], styles[variant], className)

    return (
        <div className={inputClass}>
            <input
                id={id}
                className={styles.input}
                placeholder={' '}
                type={showPassword ? 'text' : type}
                name={name}
                autoComplete={autoComplete}
                onChange={onChange}
                ref={ref}
                onKeyDown={onKeyDown && ((e) => { onKeyDown(e); })}
                onFocus={onFocus}
            />
            {label && (
                <label className={styles.placeholder} htmlFor={id}>
                    {label}
                </label>
            )}
            {type === 'password' && (
                <button className={styles['password-button']} type="button" onClick={toggleShowPassword}>
                    <IconFont iconName={showPassword ? 'icon-eye-open' : 'icon-eye-slashed'} classname={styles['eye-icon']}/>
                </button>
            )}
        </div>
    );
}));
