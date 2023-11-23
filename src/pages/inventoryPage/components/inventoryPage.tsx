import { Outlet } from 'react-router-dom';

import { AppRibbon } from '@widgets/appRibbon';
import { AppBody, AppHeader } from '@shared/layouts';
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
            <AppHeader title="Инвентаризация">
                <AppRibbon navLinks={navLinks} />
            </AppHeader>
            <AppBody>
                <Outlet />
            </AppBody>
        </>
    );
};
export default InventoryPage;
