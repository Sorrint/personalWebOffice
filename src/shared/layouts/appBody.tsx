import { ReactNode } from 'react';

interface AppBody {
    children: ReactNode;
}

const AppBody = ({ children }: AppBody) => {
    return (
        <div className="app__body">
            <div className="content__container">{children}</div>
        </div>
    );
};

export default AppBody;
