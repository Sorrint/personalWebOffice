import { type ReactNode } from 'react';
import './appHeader.scss';

interface AppHeaderProps {
    children?: ReactNode
    title: string
}

export const AppHeader = ({ children, title }: AppHeaderProps) => {
    return (
        <div className="app__header">
            <div className="app__container">
                <div className="app__title">{title}</div>
                {children}
            </div>
        </div>
    );
};
