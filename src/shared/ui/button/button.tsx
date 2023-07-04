import { FC, ReactNode } from 'react';
import './buttons.scss';
interface Button {
    onClick?: (...args: any) => void;
    buttonType?: 'submit' | 'cancel';
    children?: ReactNode;
}

export const Button: FC<Button> = ({ onClick, buttonType = 'submit', children }) => {
    const getClassname = (type: string) => (type === 'cancel' ? 'cancel-button' : 'submit-button');

    return (
        <button className={getClassname(buttonType)} onClick={onClick}>
            {children}
        </button>
    );
};
