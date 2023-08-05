import { Navigate, type RouteObject } from 'react-router-dom';

import { DocumentsPage } from '@pages/documentsPage';
import { InventoryPage } from '@pages/inventoryPage';
import { PackagesPage } from '@pages/packagesPage';
import { ProductsPage } from '@pages/productsPage';
import { ProfilePage } from '@pages/profilePage';

import { InventoriesList, InventoryCreate, InventoryEdit } from '@widgets/inventoryPageBody';
import { Distribution, EditOrderingProducts, Order, Ordering } from '@widgets/documentPageBody';
import ProductsCategories from '@widgets/productsPageBody';
import { routesLinks } from '@widgets/navBar/model/menuItems';
import { EditPackageForm } from '@features/editPackageForm';

const routes: RouteObject[] = [
    { index: true, element: <Navigate to={`.${routesLinks.documents.path}`} /> },
    {
        path: `${routesLinks.documents.path}`,
        element: <DocumentsPage />,
        children: [
            { path: 'order', element: <Order /> },
            { path: 'ordering', element: <Ordering /> },
            { path: 'editOrderingProducts', element: <EditOrderingProducts /> },
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
        path: `${routesLinks.packages.path}`,
        element: <PackagesPage/>,
        children: [
            { path: 'create', element: <EditPackageForm />},
            { index: true, element: <Navigate to={'./create'} /> },
            { path: '*', element: <Navigate to={'./create'} /> }
        ]
    },
    {
        path: `${routesLinks.profile.path}`,
        element: <ProfilePage />
    },
    { path: '*', element: <Navigate to={`.${routesLinks.documents.path}`} /> }
];
export default routes;
