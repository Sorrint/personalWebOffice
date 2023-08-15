import { forwardRef, memo, type ReactNode, type ChangeEvent, type ForwardedRef } from 'react';
import './buttons.scss';
import { Icon } from '../icon';
import Arrows_icon from '@shared/assets/icons/arrows-up-down.svg';
interface ButtonProps {
    onClick?: (...args: any) => void
    buttonType?: 'submit' | 'cancel' | 'dropdown'
    children?: ReactNode
    className?: string
    onKeyDown?: (...args: any) => void
    name?: string
    onChange?: (e: ChangeEvent<HTMLButtonElement>) => void

}

export const Button = memo(forwardRef(function Button(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
    const { onClick, buttonType = 'submit', children, className,  onKeyDown, name, onChange} = props;
    const getClassname = (type: string) => (`${type}-button ${ className ?? ''}`);

    return (
        <button className={getClassname(buttonType)} name={name} ref={ref} onClick={onClick} onKeyDown={onKeyDown} onChange={onChange}>
            {children}
            {buttonType == 'dropdown'&& <Icon Icon={Arrows_icon}/>}
        </button>
    );
}));
