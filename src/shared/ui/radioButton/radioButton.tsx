import { forwardRef, type ForwardedRef, type KeyboardEvent } from 'react';
import { type FieldValues, type Path } from 'react-hook-form';

import styles from './radioButton.module.scss';
import classNames from 'classnames';

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

    const radioStyles = classNames(styles.label, {
        [styles.disabled]: disabled
    }, inputClass)

    return (
        <label className={radioStyles}>
            <input
                type={'radio'}
                id={name}
                name={name}
                className={styles.input}
                onChange={onChange}
                value={value}
                ref={ref}
                onKeyDown={onKeyDown && ((e) => { onKeyDown(e); })}
                disabled={disabled}
            />
            <div className={styles.icon}/>
            {label}
        </label>
    );
});
