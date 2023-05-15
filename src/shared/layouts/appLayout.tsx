import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
    style?: 'wrapper' | 'content';
}

const AppLayout = ({ children, style }: LayoutProps) => {
    return <div className={`app__${style}`}>{children}</div>;
};

export default AppLayout;
