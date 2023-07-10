import { type ReactNode } from 'react';
import './appBody.scss';

interface AppBodyProps {
    children: ReactNode
}

export const AppBody = ({ children }: AppBodyProps) => {
    return (
        <div className="app__body">
            <div className="content__container">{children}</div>
        </div>
    );
};
