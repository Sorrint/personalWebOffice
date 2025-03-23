import classNames from 'classnames';
import { forwardRef, memo, type ReactNode, type ChangeEvent, type ForwardedRef } from 'react';

import styles from './Button.module.scss';
import { IconFont } from '../IconFont';
export interface ButtonProps {
  onClick?: (...args: any[]) => void;
  buttonType?: 'submit' | 'cancel' | 'dropdown';
  children?: ReactNode;
  className?: string;
  onKeyDown?: (...args: any[]) => void;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  full?: boolean;
  outline?: boolean;
}

export const Button = memo(
  forwardRef(function Button(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
    const {
      onClick,
      buttonType,
      children,
      className,
      onKeyDown,
      name,
      onChange,
      disabled,
      full,
      outline,
    } = props;

    const btnClassName = classNames(
      styles.btn,
      styles[buttonType ?? 'submit'],
      {
        [styles.disabled]: disabled,
        [styles.full]: full,
        [styles.outline]: outline,
      },
      className,
    );

    return (
      <button
        className={btnClassName}
        name={name}
        ref={ref}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onChange={onChange}
        disabled={disabled}
      >
        {children}
        {buttonType == 'dropdown' && <IconFont iconName='icon-arrows-up-down' />}
      </button>
    );
  }),
);
