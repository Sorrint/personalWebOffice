import type { ForwardedRef } from 'react';
import { forwardRef, type FC, type ReactNode } from 'react';
import './buttons.scss';
import { Icon } from '../icon';
import Arrows_icon from '@shared/assets/icons/arrows-up-down.svg';
interface ButtonProps {
    onClick?: (...args: any) => void
    buttonType?: 'submit' | 'cancel' | 'dropdown'
    children?: ReactNode
    className?: string
    onKeyDown?: (...args: any) => void

}

export const Button = forwardRef(function Button(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
    const { onClick, buttonType = 'submit', children, className,  onKeyDown} = props;
    const getClassname = (type: string) => (`${type}-button ${ className ?? ''}`);

    return (
        <button className={getClassname(buttonType)} ref={ref} onClick={onClick} onKeyDown={onKeyDown}>
            {children}
            {buttonType == 'dropdown'&& <Icon Icon={Arrows_icon}/>}
        </button>
    );
});
