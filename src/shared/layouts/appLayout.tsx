import { type ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode
    style?: 'wrapper' | 'content'
}

const AppLayout = ({ children, style }: LayoutProps) => {
    return <div className={`app__${style ?? 'wrapper'}`}>{children}</div>;
};

export default AppLayout;
