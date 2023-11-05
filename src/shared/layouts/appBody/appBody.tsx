import { type ReactNode } from 'react';
import styles from './appBody.module.scss';

interface AppBodyProps {
    children: ReactNode
}

export const AppBody = ({ children }: AppBodyProps) => {
    return (
        <div className={styles.body}>
            <div className={styles.content}>{children}</div>
        </div>
    );
};
