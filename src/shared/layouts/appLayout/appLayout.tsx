import { type ReactNode } from 'react';
import cls from './appLayout.module.scss';

interface LayoutProps {
    header: ReactNode
    sidebar: ReactNode
    children: ReactNode
}

export const AppLayout = ({ header, sidebar, children}: LayoutProps) => {
    return <>
        {header}
        <div className={cls.app__wrapper}>
            {sidebar}
            <div className={cls.app__content}>
                {children}
            </div>
        </div>
    </>;
};
