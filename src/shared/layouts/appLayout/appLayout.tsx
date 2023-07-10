import { type ReactNode } from 'react';
import './appLayout.scss';

interface LayoutProps {
    children: ReactNode
    style?: 'wrapper' | 'content'
}

export const AppLayout = ({ children, style }: LayoutProps) => {
    return <div className={`app__${style ?? 'wrapper'}`}>{children}</div>;
};
