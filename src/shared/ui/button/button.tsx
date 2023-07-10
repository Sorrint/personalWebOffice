import { type FC, type ReactNode } from 'react';
import './buttons.scss';
interface ButtonProps {
    onClick?: (...args: any) => void
    buttonType?: 'submit' | 'cancel'
    children?: ReactNode
}

export const Button: FC<ButtonProps> = ({ onClick, buttonType = 'submit', children }) => {
    const getClassname = (type: string) => (type === 'cancel' ? 'cancel-button' : 'submit-button');

    return (
        <button className={getClassname(buttonType)} onClick={onClick}>
            {children}
        </button>
    );
};
