import { forwardRef, ForwardedRef, KeyboardEvent } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

import './radioButton.scss';

interface IRadioButtonProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
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
    onKeyDown?: (e: KeyboardEvent) => void;
    checked?: boolean;
    disabled?: boolean;
}

const RadioButton = forwardRef(function RadioButton<T extends FieldValues>(
    props: IRadioButtonProps<T>,
    ref: ForwardedRef<HTMLInputElement>
) {
    const {
        label,
        name,
        error,
        autoComplete,
        field,
        value,
        onChange,
        onClick,
        inputClass,
        onKeyDown,
        disabled = false
    } = props;
    const getInputClasses = () => {
        return 'radioButton-container__input' + (error ? ' is-invalid' : '') + (inputClass ? ` ${inputClass}` : '');
    };

    return (
        <div className="radioButton-container">
            <div className="radioButton-group has-validation">
                <input
                    type={'radio'}
                    id={name}
                    name={name}
                    className={getInputClasses()}
                    autoComplete={autoComplete}
                    {...field}
                    onChange={onChange}
                    value={value}
                    onClick={onClick}
                    ref={ref}
                    onKeyDown={onKeyDown && ((e) => onKeyDown(e))}
                    disabled={disabled}
                />
                <div className="cut"></div>

                <label className="radioButton-label" htmlFor={name}>
                    {label}
                </label>
            </div>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
});

export default RadioButton;
