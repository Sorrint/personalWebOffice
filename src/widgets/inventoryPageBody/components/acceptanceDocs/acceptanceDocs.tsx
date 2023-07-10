import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import './acceptanceDocs.scss';

export const AcceptanceDocs: FC = () => {
    return (
        <>
            <Outlet />
        </>
    );
};
