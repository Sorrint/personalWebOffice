import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@widgets/header';
import { NavBar } from '@widgets/navBar';
import { AppRibbon } from '@widgets/appRibbon';
import { AppBody, AppHeader, AppLayout } from '@shared/layouts';
import { type INavLinkObject } from '@shared/types/navLinkTypes';

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
