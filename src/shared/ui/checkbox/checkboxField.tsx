import { useState, forwardRef, ForwardedRef, KeyboardEvent } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

import './checkboxField.scss';

interface ICheckboxFieldProps<T extends FieldValues> {
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
}

export const CheckboxField = forwardRef(function CheckboxField<T extends FieldValues>(
    props: ICheckboxFieldProps<T>,
    ref: ForwardedRef<HTMLInputElement>
) {
    const { label, name, error, autoComplete, field, value, onChange, onClick, inputClass, onKeyDown } = props;
    const getInputClasses = () => {
        return 'checkbox-container__input' + (error ? ' is-invalid' : '') + (inputClass ? ` ${inputClass}` : '');
    };

    return (
        <div className="checkbox-container">
            <div className="checkbox-group has-validation">
                <input
                    type={'checkbox'}
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
                />
                <div className="cut"></div>

                <label className="checkbox-label" htmlFor={name}>
                    {label}
                </label>
            </div>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
});

