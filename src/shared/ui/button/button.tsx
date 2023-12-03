import classNames from 'classnames';
import { 
    forwardRef, 
    memo, 
    type ReactNode, 
    type ChangeEvent, 
    type ForwardedRef } from 'react';

import styles from './button.module.scss'
import { IconFont } from '../iconFont';
interface ButtonProps {
    onClick?: (...args: any[]) => void
    buttonType?: 'submit' | 'cancel' | 'dropdown'
    children?: ReactNode
    classname?: string
    onKeyDown?: (...args: any[]) => void
    name?: string
    onChange?: (e: ChangeEvent<HTMLButtonElement>) => void
    disabled?: boolean
    full?: boolean
}

export const Button = memo(forwardRef(function Button(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
    
    const { onClick, buttonType, children, 
        classname,  onKeyDown, name, onChange, disabled, full} = props;
    
    const btnClassName = classNames(
        styles.btn, 
        styles[buttonType ?? 'submit'], 
        {
            [styles.disabled]: disabled,
            [styles.full]: full
        }, 
        classname
    )
    
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
            {buttonType == 'dropdown'&& 
            <IconFont iconName='icon-arrows-up-down'/>
            }
        </button>
    );
}));
