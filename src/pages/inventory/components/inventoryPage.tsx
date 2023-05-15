import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { INavLinkObject } from 'shared/ui/navLink/navLinkTypes';
import { Header } from 'widgets/header';
import AppLayout from 'shared/layouts/appLayout';
import { NavBar } from 'widgets/navBar';
import AppHeader from 'shared/layouts/appHeader';
import AppBody from 'shared/layouts/appBody';
import AppRibbon from 'widgets/appRibbon';

const InventoryPage: FC = () => {
    const navLinks: INavLinkObject = {
        order: {
            path: '/inventory-lists/documents',
            title: 'Список документов'
        }
    };

    return (
        <>
            <Header />
            <AppLayout style="wrapper">
                <NavBar />
                <AppLayout style="content">
                    <AppHeader title="Инвентаризация">
                        <AppRibbon navLinks={navLinks} />
                    </AppHeader>
                    <AppBody>
                        <Outlet />
                    </AppBody>
                </AppLayout>
            </AppLayout>
        </>
    );
};
export default InventoryPage;
