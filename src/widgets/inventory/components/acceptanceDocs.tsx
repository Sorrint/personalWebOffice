import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import './acceptanceDocs.scss';

const GoodsSearchList: FC = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default GoodsSearchList;
