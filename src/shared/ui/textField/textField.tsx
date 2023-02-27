import { useState } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import './textField.scss';
interface ITextFieldsProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    type?: string;
    error?: string;
    placeholder?: string;
    register?: UseFormRegister<T>;
    formName?: string;
    autoComplete?: string;
    field?: T;
    value?: string;
    onClick?: (e: React.MouseEvent) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputClass?: string;
}

export default function TextField<T extends FieldValues>(props: ITextFieldsProps<T>) {
    const { label, name, type, error, register, autoComplete, field, value, onChange, onClick, inputClass } = props;
    const [showPassword, setShowPassword] = useState(false);
    const getInputClasses = () => {
        return 'input-container__input' + (error ? ' is-invalid' : '') + (inputClass ? ` ${inputClass}` : '');
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="input-container">
            <div className="input-group has-validation">
                <input
                    type={showPassword ? 'text' : type}
                    id={name}
                    name={name}
                    className={getInputClasses()}
                    placeholder={' '}
                    {...(register && { ...register(name) })}
                    autoComplete={autoComplete}
                    {...field}
                    onChange={onChange}
                    value={value}
                    onClick={onClick}
                />
                <div className="cut"></div>

                <label className="placeholder" htmlFor={name}>
                    {label}
                </label>

                {type === 'password' && (
                    <button className="input-container__password-button" type="button" onClick={toggleShowPassword}>
                        {/* <i className="input-container__icon">{icon}</i> */}
                    </button>
                )}
            </div>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}
