import { type ReactNode } from 'react';

import styles from './appLayout.module.scss';

interface LayoutProps {
    header: ReactNode
    sidebar: ReactNode
    children: ReactNode
    isSidebarOpen?: boolean
    closeSidebar?: () => void 
}

export const AppLayout = ({ header, sidebar, children, closeSidebar, isSidebarOpen}: LayoutProps) => {
    return <>
        {header}
        <div className={styles.app__wrapper}>
            {sidebar}
            <div className={isSidebarOpen ? styles.backdrop : ''} onClick={()=>closeSidebar?.()}/>
            <div className={styles.app__content}>
                {children}
            </div>
        </div>
    </>;
};
