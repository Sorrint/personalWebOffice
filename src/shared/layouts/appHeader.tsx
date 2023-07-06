import { type ReactNode } from 'react';

interface AppHeaderProps {
    children?: ReactNode
    title: string
}

const AppHeader = ({ children, title }: AppHeaderProps) => {
    return (
        <div className="app__header">
            <div className="app__container">
                <div className="app__title">{title}</div>
                {children}
            </div>
        </div>
    );
};

export default AppHeader;
