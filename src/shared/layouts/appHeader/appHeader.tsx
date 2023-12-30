import { type ReactNode } from 'react';
import styles from './appHeader.module.scss';
import { Container } from '../container/container';

interface AppHeaderProps {
    children?: ReactNode
    renderBtn?: ()=> ReactNode
    title: string
}

export const AppHeader = ({ children, title, renderBtn }: AppHeaderProps) => {
    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.component}>
                    <div className={styles.title}>{title}</div>
                    {renderBtn?.()}
                </div>
                {children}
            </Container>
        </div>
    );
};
