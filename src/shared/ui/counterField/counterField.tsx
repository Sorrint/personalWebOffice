import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { MouseEvent, ChangeEvent, KeyboardEvent, ForwardedRef, RefCallback } from 'react';
import './counterField.scss';
interface ICounterFieldsProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    error?: string;
    placeholder?: string;
    register?: UseFormRegister<T>;
    formName?: string;
    autoComplete?: string;
    field?: T;
    value?: string;
    onClick?: (e: MouseEvent) => void;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    inputClass?: string;
    onKeyPress?: (e: KeyboardEvent, name: Path<T>) => void;
    tabIndex?: number;
}

export default function CounterField<T extends FieldValues>(props: ICounterFieldsProps<T>) {
    const {
        label,
        name,
        error,
        register,
        autoComplete,
        field,
        value,
        onChange,
        onClick,
        inputClass,
        onKeyPress,
        tabIndex
    } = props;
    const getInputClasses = () => {
        return 'counter-container__input' + (error ? ' is-invalid' : '') + (inputClass ? ` ${inputClass}` : '');
    };

    return (
        <div className="counter-container">
            <div className="counter-group has-validation">
                <label className="counter-label" htmlFor={name}>
                    {label}
                </label>
                <input
                    id={name}
                    name={name}
                    className={getInputClasses()}
                    {...(register && { ...register(name, { valueAsNumber: true }) })}
                    autoComplete={autoComplete}
                    {...field}
                    onChange={onChange}
                    value={value}
                    onClick={onClick}
                    type={'number'}
                    onKeyDown={onKeyPress && ((e) => onKeyPress(e, name))}
                    tabIndex={tabIndex}
                />
            </div>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}
