import { Outlet } from 'react-router-dom';

import { Header } from '@widgets/header';
import { NavBar } from '@widgets/sideBar';
import { AppRibbon } from '@widgets/appRibbon';
import { orderReducer } from '@entities/orders';
import { AsyncReduxComponent, type ReducersList } from '@shared/lib/components';
import { type INavLinkObject } from '@shared/types/navLinkTypes';
import { AppBody, AppHeader, AppLayout } from '@shared/layouts';

const reducers: ReducersList = {
    orders: orderReducer
};

const DocumentsPage = () => {
    const navLinks: INavLinkObject = {
        order: {
            path: '/office/documents/orders',
            title: 'Заказы'
        },
        ordering: {
            path: '/office/documents/orderings',
            title: 'Порядовки'
        },
        distribution: {
            path: '/office/documents/distributions',
            title: 'Распаллетовки'
        },
        createOrder: {
            path: '/office/documents/orders/create',
            title: 'Создать заказ'
        }
    };

    return (
        <>
            <Header />
            <AppLayout style="wrapper">
                <NavBar />
                <AppLayout style="content">
                    <AppHeader title="Документы">
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
