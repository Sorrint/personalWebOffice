import { type ReactNode } from 'react';
import styles from './appHeader.module.scss';
import { Container } from '../container/container';

interface AppHeaderProps {
    children?: ReactNode
    title: string
}

export const AppHeader = ({ children, title }: AppHeaderProps) => {
    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.title}>{title}</div>
                {children}
            </Container>
        </div>
    );
};
