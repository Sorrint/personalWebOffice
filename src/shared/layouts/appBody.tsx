import { type ReactNode } from 'react';

interface AppBodyProps {
    children: ReactNode
}

const AppBody = ({ children }: AppBodyProps) => {
    return (
        <div className="app__body">
            <div className="content__container">{children}</div>
        </div>
    );
};

export default AppBody;
