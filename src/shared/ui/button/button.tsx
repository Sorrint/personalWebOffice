import classNames from 'classnames';
import { 
    forwardRef, 
    memo, 
    type ReactNode, 
    type ChangeEvent, 
    type ForwardedRef } from 'react';

import Arrows_icon from '@shared/assets/icons/arrows-up-down.svg';

import { Icon } from '../icon';
import styles from './button.module.scss'
interface ButtonProps {
    onClick?: (...args: any[]) => void
    buttonType?: 'submit' | 'cancel' | 'dropdown'
    children?: ReactNode
    classname?: string
    onKeyDown?: (...args: any[]) => void
    name?: string
    onChange?: (e: ChangeEvent<HTMLButtonElement>) => void
    disabled?: boolean
}

export const Button = memo(forwardRef(function Button(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
    
    const { onClick, buttonType, children, 
        classname,  onKeyDown, name, onChange, disabled} = props;
    
    const btnClassName = classNames(
        styles.btn, 
        styles[buttonType ?? 'submit'], 
        {
            [styles.disabled]: disabled
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
            {buttonType == 'dropdown'&& <Icon Icon={Arrows_icon}/>}
        </button>
    );
}));
