import { Navigate, type RouteObject } from 'react-router-dom';

import { DocumentsPage } from '@pages/documentsPage';
import { ProductsPage } from '@pages/productsPage';
import { InventoryPage } from '@pages/inventoryPage';
import { ProfilePage } from '@pages/profilePage';

import { InventoriesList, InventoryCreate, InventoryEdit } from '@widgets/inventoryPageBody';
import { Distribution, Order, Ordering } from '@widgets/documentPageBody';
import ProductsCategories from '@widgets/productsPageBody';
import { routesLinks } from '@widgets/navBar/model/menuItems';

const routes: RouteObject[] = [
    { index: true, element: <Navigate to={`.${routesLinks.documents.path}`} /> },
    {
        path: `${routesLinks.documents.path}`,
        element: <DocumentsPage />,
        children: [
            { path: 'order', element: <Order /> },
            { path: 'ordering', element: <Ordering /> },
            { path: 'distribution', element: <Distribution /> },
            { index: true, element: <Navigate to={'./order'} /> },
            { path: '*', element: <Navigate to={'./order'} /> }
        ]
    },
    {
        path: `${routesLinks.inventory.path}`,
        element: <InventoryPage />,
        children: [
            {
                path: 'documents',
                children: [
                    { path: 'create', element: <InventoryCreate /> },
                    {
                        path: ':number',
                        element: <InventoryEdit />
                    },
                    { index: true, element: <InventoriesList /> }
                ]
            },
            { index: true, element: <Navigate to={'./documents'} /> },
            { path: '*', element: <Navigate to={'./documents'} /> }
        ]
    },
    {
        path: `${routesLinks.products.path}`,
        element: <ProductsPage />,
        children: [
            { path: 'categories', element: <ProductsCategories /> },
            { index: true, element: <Navigate to={'./categories'} /> },
            { path: '*', element: <Navigate to={'./categories'} /> }
        ]
    },
    {
        path: `${routesLinks.profile.path}`,
        element: <ProfilePage />
    },
    { path: '*', element: <Navigate to={`.${routesLinks.documents.path}`} /> }
];
export default routes;
