import { useState, forwardRef, ForwardedRef, KeyboardEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import parse from 'html-react-parser';

import './textField.scss';
import { eyeSvg } from '@shared/lib/svg/eye';

export interface ITextFieldsProps<T extends FieldValues> {
    label?: string;
    name: Path<T>;

    type?: 'text' | 'number' | 'password' | 'email' | 'tel';
    error?: string;
    formName?: string;
    autoComplete?: string;
    variant?: 'standard' | 'outline';
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputClass?: string;
    onKeyDown?: (e: KeyboardEvent) => void;
}

export const TextField = forwardRef(function TextField<T extends FieldValues>(
    props: ITextFieldsProps<T>,
    ref: ForwardedRef<HTMLInputElement>
) {
    const { label, name, type, error, autoComplete, onChange, onKeyDown, variant = 'outline' } = props;
    const [showPassword, setShowPassword] = useState(false);
    const getInputClasses = () => {
        return `input-container__input input_${variant}` + (error ? ' is-invalid' : '');
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className={'input-container' + (error ? ' is-invalid' : '')}>
            <div className="input-group has-validation">
                <input
                    id={name}
                    className={getInputClasses()}
                    placeholder={' '}
                    type={showPassword ? 'text' : type}
                    name={name}
                    autoComplete={autoComplete}
                    onChange={onChange}
                    ref={ref}
                    onKeyDown={onKeyDown && ((e) => onKeyDown(e))}
                />
                <div className="cut"></div>

                {label && (
                    <label className="placeholder" htmlFor={name}>
                        {label}
                    </label>
                )}

                {type === 'password' && (
                    <button className="input-container__password-button" type="button" onClick={toggleShowPassword}>
                        <i className={`input-container__icon input_${variant}`}>{parse(eyeSvg)}</i>
                    </button>
                )}
            </div>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
});
