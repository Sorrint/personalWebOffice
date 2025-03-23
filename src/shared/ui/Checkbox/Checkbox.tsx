import classNames from 'classnames';
import { type ForwardedRef, type ReactNode, forwardRef } from 'react';
import { type FieldValues, type Path } from 'react-hook-form';
import styles from './Checkbox.module.scss';
interface CheckboxProps<T extends FieldValues> {
  defaultChecked?: boolean;
  className?: string;
  crossout?: boolean;
  disabled?: boolean;
  name: Path<T>;
  onChange?: (checked: boolean) => void;
  text: ReactNode | string;
  value?: string;
}

export const Checkbox = forwardRef(function Checkbox<T extends FieldValues>(
  props: CheckboxProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { defaultChecked, className, disabled = false, name, onChange, text, value } = props;

  const customCheckboxStyles = classNames(styles['custom-checkbox'], {
    [styles.disabled]: disabled,
  });

  return (
    <label className={classNames(styles.label, className)}>
      <input
        defaultChecked={defaultChecked}
        className={classNames(styles.checkbox)}
        disabled={disabled}
        id={name}
        name={name}
        onChange={e => onChange?.(e.target.checked)}
        ref={ref}
        type='checkbox'
        value={value}
      />
      <span className={customCheckboxStyles}>{text}</span>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
