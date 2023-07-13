import { Outlet } from 'react-router-dom';
import { type FC } from 'react';

import { Header } from '@widgets/header';
import { NavBar } from '@widgets/navBar';
import AppRibbon from '@widgets/appRibbon';
import { AppBody, AppHeader, AppLayout } from '@shared/layouts';
import { type INavLinkObject } from '@shared/types/navLinkTypes';
import { type ReducersList, orderReducer } from '@entities/orders';
import { AsyncReduxComponent } from '@shared/lib/components';

const reducers: ReducersList = {
    orders: orderReducer
};

const DocumentsPage: FC = () => {
    const navLinks: INavLinkObject = {
        order: {
            path: '/office/documents/order',
            title: 'Заказ'
        },
        ordering: {
            path: '/office/documents/ordering',
            title: 'Порядовка'
        },
        distribution: {
            path: '/office/documents/distribution',
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
                    <AsyncReduxComponent reducersList={reducers} >
                        <AppBody>
                            <Outlet />
                        </AppBody>
                    </AsyncReduxComponent>
                </AppLayout>
            </AppLayout>
        </>
    );
};

export default DocumentsPage;
