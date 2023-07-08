import { useState, forwardRef, type ForwardedRef, type KeyboardEvent } from 'react';
import { type FieldValues, type Path } from 'react-hook-form';
import OpenEyeIcon from '@shared/assets/icons/eye-open.svg';
import SlashedEyeIcon from '@shared/assets/icons/eye-slashed.svg';
import { Icon } from '../icon';

import './textField.scss';

export interface ITextFieldsProps<T extends FieldValues> {
    label?: string
    name: Path<T>

    type?: 'text' | 'number' | 'password' | 'email' | 'tel'
    error?: string
    formName?: string
    autoComplete?: string
    variant?: 'standard' | 'outline'
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    inputClass?: string
    onKeyDown?: (e: KeyboardEvent) => void
}

export const TextField = forwardRef(function TextField<T extends FieldValues> (
    props: ITextFieldsProps<T>,
    ref: ForwardedRef<HTMLInputElement>
) {
    const { label, name, type, error, autoComplete, onChange, onKeyDown, variant = 'outline' } = props;
    const [showPassword, setShowPassword] = useState(false);

    const getInputClasses = () => {
        return `input-group input-group_${variant}`;
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className={'input-container' + (error ? ' is-invalid' : '')}>
            <div className={`${getInputClasses()}` + (error ? ' is-invalid' : '')}>
                <input
                    id={name}
                    className={'input-container__input'}
                    placeholder={' '}
                    type={showPassword ? 'text' : type}
                    name={name}
                    autoComplete={autoComplete}
                    onChange={onChange}
                    ref={ref}
                    onKeyDown={onKeyDown && ((e) => { onKeyDown(e); })}
                />
                {label && (
                    <label className="placeholder" htmlFor={name}>
                        {label}
                    </label>
                )}
                {type === 'password' && (
                    <button className="input-container__password-button" type="button" onClick={toggleShowPassword}>
                        <Icon Icon={showPassword ? OpenEyeIcon : SlashedEyeIcon} className='eye-icon'/>
                    </button>
                )}
            </div>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
});
