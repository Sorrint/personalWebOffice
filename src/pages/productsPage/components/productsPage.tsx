import { Outlet } from 'react-router-dom';

import { AppRibbon } from '@widgets/appRibbon';
import { AppBody, AppHeader } from '@shared/layouts';
import { type INavLinkObject } from '@shared/types/navLinkTypes';

const ProductsPage = () => {
    const navLinks: INavLinkObject = {
        order: {
            path: '/office/products/categories',
            title: 'Список категорий'
        }
    };

    return (
        <>
            <AppHeader title="Товары">
                <AppRibbon navLinks={navLinks} />
            </AppHeader>
            <AppBody>
                <Outlet />
            </AppBody>
        </>
    );
};
export default ProductsPage;
