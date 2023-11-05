import { useState, forwardRef, type ForwardedRef, type KeyboardEvent, memo } from 'react';
import { type FieldValues, type Path } from 'react-hook-form';

import styles from './textField.module.scss';
import { IconFont } from '../iconFont/IconFont';
import classNames from 'classnames';

export type ITextFieldType = 'text' | 'number' | 'password' | 'email' | 'tel'
export interface ITextFieldsProps<T extends FieldValues> {
    label?: string
    name: Path<T>
    type?: ITextFieldType
    error?: string
    formName?: string
    autoComplete?: string
    variant?: 'standard' | 'outline'
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    inputClass?: string
    onKeyDown?: (e: KeyboardEvent) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    className?: string
    size?: 'normal' | 'full'
}

export const TextField = memo(forwardRef(function TextField<T extends FieldValues> (
    props: ITextFieldsProps<T>,
    ref: ForwardedRef<HTMLInputElement | null>
) {
    const { label, name, type, error, autoComplete, onChange, onKeyDown, variant = 'outline', onFocus, className, size = 'normal' } = props;
    const [showPassword, setShowPassword] = useState(false);

 
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const containerClass = classNames(styles.container, styles[size],  {
        [styles['is-invalid']]: error
    }, className)

    const inputClass = classNames(styles['input-group'], styles[variant])

    return (
        <div className={containerClass}>
            <div className={inputClass}>
                <input
                    id={`${name}-${new Date().getTime()}`}
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
                    <label className={styles.placeholder} htmlFor={name}>
                        {label}
                    </label>
                )}
                {type === 'password' && (
                    <button className={styles['password-button']} type="button" onClick={toggleShowPassword}>
                        <IconFont iconName={showPassword ? 'icon-eye-open' : 'icon-eye-slashed'} classname={styles['eye-icon']}/>
                    </button>
                )}
            </div>
            {error && <div className={styles['invalid-feedback']}>{error}</div>}
        </div>
    );
}));
