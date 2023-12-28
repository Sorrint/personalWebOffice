import { type ReactNode } from 'react';
import { Container } from '../container/container';
import style from './appBody.module.scss'
interface AppBodyProps {
    children: ReactNode
}

export const AppBody = ({ children }: AppBodyProps) => {
    return (
        <div className={style.component}>
            <Container>
                {children}
            </Container>
        </div>
    );
};
