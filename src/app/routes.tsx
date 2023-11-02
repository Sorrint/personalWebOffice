import { Navigate, type RouteObject } from 'react-router-dom';

import { DocumentsPage } from '@pages/documentsPage';
import { InventoryPage } from '@pages/inventoryPage';
import { PackagesPage } from '@pages/packagesPage';
import { ProductsPage } from '@pages/productsPage';
import { ProfilePage } from '@pages/profilePage';

import { InventoriesList, InventoryCreate, InventoryEdit } from '@widgets/inventoryPageBody';
import { AddOrderProducts, CreateOrder, Distribution, OrderDetails, CreateOrdering, OrdersCatalog } from '@widgets/documentPageBody';
import ProductsCategories from '@widgets/productsPageBody';
import { routesLinks } from '@widgets/navBar';

import { EditPackageCategory } from '@features/editPackageCategory';
import { EditPackageForm } from '@features/editPackageForm';
import { AuthPage } from '@pages/authPage';

const routes: RouteObject[] = [
    { index: true, element: <Navigate to={`.${routesLinks.documents.path}`} /> },
    {
        path: `${routesLinks.documents.path}`,
        element: <DocumentsPage />,
        children: [
            { path: 'orders',  children: [
                {path: ':_id', element: <OrderDetails />},
                {path: 'addProducts', element: <AddOrderProducts />},
                {path: 'create', element: <CreateOrder />},
                {index: true, element: <OrdersCatalog />}
            ] },
            { path: 'orderings', children: [
                {path: 'create',element: <CreateOrdering />},
                {index: true, element: <CreateOrdering/>},
            ] },
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
            { path: 'category/create', element: <EditPackageCategory />},
            { index: true, element: <Navigate to={'./create'} /> },
            { path: '*', element: <Navigate to={'./create'} /> }
        ]
    },
    {
        path: `${routesLinks.profile.path}`,
        element: <ProfilePage />
    },
    {
        path: `${routesLinks.register.path}`,
        element: <AuthPage />
    },
    {
        path: `${routesLinks.login.path}`,
        element: <AuthPage />
    },
    { path: '*', element: <Navigate to={`.${routesLinks.documents.path}`} /> }
];
export default routes;
