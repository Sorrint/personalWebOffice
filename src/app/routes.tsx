import { Navigate, type RouteObject } from 'react-router-dom';

import { DocumentsPage } from '@pages/documentsPage';
import { InventoryPage } from '@pages/inventoryPage';
import { PackagesPage } from '@pages/packagesPage';
import { ProductsPage } from '@pages/productsPage';
import { ProfilePage } from '@pages/profilePage';

import { InventoriesList, InventoryCreate, InventoryEdit } from '@widgets/inventoryPageBody';
import { Distribution, EditOrderingProducts, Order, Ordering, OrdersCatalog } from '@widgets/documentPageBody';
import ProductsCategories from '@widgets/productsPageBody';
import { routesLinks } from '@widgets/navBar/model/menuItems';
import { EditPackageForm } from '@features/editPackageForm';

const routes: RouteObject[] = [
    { index: true, element: <Navigate to={`.${routesLinks.documents.path}`} /> },
    {
        path: `${routesLinks.documents.path}`,
        element: <DocumentsPage />,
        children: [
            { path: 'orders',  children: [
                {path: ':_id', element: <Order />},
                {index: true, element: <OrdersCatalog />}
            ] },
            { path: 'orderings', children: [
                {path: 'create',element: <Ordering />},
                {index: true, element: <Ordering/>}
            ] },
            { path: 'editOrderingProducts', element: <EditOrderingProducts /> },
            { path: 'distributions', element: <Distribution /> },
            { index: true, element: <Navigate to={'./orders'} /> },
            { path: '*', element: <Navigate to={'./orders'} /> }
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
