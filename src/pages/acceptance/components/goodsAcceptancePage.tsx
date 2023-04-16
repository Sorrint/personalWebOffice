import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import AppRibbon from 'widgets/appRibbon/appRibbon';
import { INavLinkObject } from 'shared/ui/navLink/navLinkTypes';

const GoodsAcceptance: FC = () => {
    const navLinks: INavLinkObject = {
        order: {
            path: '/inventory-lists/documents',
            title: 'Список документов'
        }
    };

    return (
        <>
            <div className="app__header ">
                <div className="app__container">
                    <div className="app__title">Инвентаризация</div>
                    <div className="app__ribbon">
                        <AppRibbon navLinks={navLinks} />
                    </div>
                </div>
            </div>
            <div className="app__body">
                <div className="content__container">
                    <Outlet />
                </div>
            </div>
        </>
    );
};
export default GoodsAcceptance;
