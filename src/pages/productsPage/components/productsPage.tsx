import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import { type INavLinkObject } from '@shared/types/navLinkTypes';
import { Header } from '@widgets/header';
import AppLayout from '@shared/layouts/appLayout/appLayout';
import { NavBar } from '@widgets/navBar';
import AppHeader from '@shared/layouts/appHeader/appHeader';
import AppBody from '@shared/layouts/appBody/appBody';
import AppRibbon from '@widgets/appRibbon';

const ProductsPage: FC = () => {
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
                    <AppHeader title="Товары">
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
export default ProductsPage;
