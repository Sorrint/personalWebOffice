import { Outlet } from 'react-router-dom';

import { AppRibbon } from '@widgets/appRibbon';
import { orderReducer } from '@entities/orders';
import { AsyncReduxComponent, type ReducersList } from '@shared/lib/components';
import { type INavLinkObject } from '@shared/types/navLinkTypes';
import { AppBody, AppHeader } from '@shared/layouts';
import { Dropdown, type DropdownItem } from '@shared/ui/dropdown';
import { SaveOrderingToXLSX } from '@features/saveOrderingToXLSX';
import style from './documentsPage.module.scss'
import { AppLink } from '@shared/ui/appLink';

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
        }
    };

    const items: DropdownItem[] = [
        {_id: 1, content: <SaveOrderingToXLSX classname={style['list-item']}/>},
        {_id: 2, content: <AppLink to='/office/documents/orders/create'>Создать заказ</AppLink>},
    ]

    const renderBtn = () => {
        return <Dropdown title='Меню' options={items}></Dropdown>
    }

    return (
        <>
            <AppHeader title="Документы" renderBtn={renderBtn}>
                <AppRibbon navLinks={navLinks} />
            </AppHeader>
            <AsyncReduxComponent reducersList={reducers} >
                <AppBody>
                    <Outlet />
                </AppBody>
            </AsyncReduxComponent>
        </>
    );
};

export default DocumentsPage;
