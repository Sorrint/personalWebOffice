import { type ReactNode } from 'react';
import styles from './appHeader.module.scss';

interface AppHeaderProps {
    children?: ReactNode
    title: string
}

export const AppHeader = ({ children, title }: AppHeaderProps) => {
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.title}>{title}</div>
            </div>
            {children}
        </div>
    );
};
