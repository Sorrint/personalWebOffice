import { forwardRef, type ForwardedRef, type KeyboardEvent } from 'react';
import { type FieldValues, type Path } from 'react-hook-form';

import './radioButton.scss';

interface IRadioButtonProps<T extends FieldValues> {
    label: string
    name: Path<T>
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    inputClass?: string
    onKeyDown?: (e: KeyboardEvent) => void
    disabled?: boolean
}

export const RadioButton = forwardRef(function RadioButton<T extends FieldValues> (
    props: IRadioButtonProps<T>,
    ref: ForwardedRef<HTMLInputElement>
) {
    const {
        label,
        name,
        value,
        onChange,
        inputClass,
        onKeyDown,
        disabled = false
    } = props;

    return (
        <label className={`radioButton__label ${inputClass ?? ''} ${disabled ? 'disabled' : ''}`}>
            <input
                type={'radio'}
                id={name}
                name={name}
                className={'radioButton__input'}
                onChange={onChange}
                value={value}
                ref={ref}
                onKeyDown={onKeyDown && ((e) => { onKeyDown(e); })}
                disabled={disabled}
            />
            <div className='radioButton__icon'/>
            {label}
        </label>
    );
});
