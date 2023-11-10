import { Outlet } from 'react-router-dom';

import { Header } from '@widgets/header';
import { SideBar } from '@widgets/sideBar';
import { AppRibbon } from '@widgets/appRibbon';
import { AppBody, AppHeader, AppLayout } from '@shared/layouts';
import { type INavLinkObject } from '@shared/types/navLinkTypes';

const InventoryPage = () => {
    const navLinks: INavLinkObject = {
        order: {
            path: '/office/inventory-lists/documents',
            title: 'Список документов'
        }
    };

    return (
        <>
            <Header />
            <AppLayout style="wrapper">
                <SideBar />
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
