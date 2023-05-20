import { Outlet } from 'react-router-dom';
import { FC } from 'react';

import { INavLinkObject } from 'shared/ui/navLink/navLinkTypes';
import { Header } from 'widgets/header';
import { NavBar } from 'widgets/navBar';
import { AppBody, AppHeader, AppLayout } from 'shared/layouts';
import AppRibbon from 'widgets/appRibbon';

const DocumentsPage: FC = () => {
    const navLinks: INavLinkObject = {
        order: {
            path: '/documents/order',
            title: 'Заказ'
        },
        ordering: {
            path: '/documents/ordering',
            title: 'Порядовка'
        },
        distribution: {
            path: '/documents/distribution',
            title: 'Распаллетовка'
        }
    };

    return (
        <>
            <Header />
            <AppLayout style="wrapper">
                <NavBar />
                <AppLayout style="content">
                    <AppHeader title="Заказ покупателя">
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

export default DocumentsPage;
