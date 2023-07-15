import { type FC, type ReactNode } from 'react';
import './buttons.scss';
import { Icon } from '../icon';
import Arrows_icon from '@shared/assets/icons/arrows-up-down.svg';
interface ButtonProps {
    onClick?: (...args: any) => void
    buttonType?: 'submit' | 'cancel' | 'dropdown'
    children?: ReactNode
    className?: string
}

export const Button: FC<ButtonProps> = ({ onClick, buttonType = 'submit', children, className }) => {
    const getClassname = (type: string) => (`${type}-button ${ className ?? ''}`);

    return (
        <button className={getClassname(buttonType)} onClick={onClick}>
            {children}
            {buttonType == 'dropdown'&& <Icon Icon={Arrows_icon}/>}
        </button>
    );
};
