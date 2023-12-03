import { Navigate, type RouteObject } from 'react-router-dom';

import { DocumentsPage } from '@pages/documentsPage';
import { InventoryPage } from '@pages/inventoryPage';
import { PackagesPage } from '@pages/packagesPage';
import { ProductsPage } from '@pages/productsPage';
import { ProfilePage } from '@pages/profilePage';
import { AuthPage } from '@pages/authPage';

import { InventoriesList, InventoryCreate, InventoryEdit } from '@widgets/inventoryPageBody';
import { AddOrderProducts, CreateOrder, Distribution, OrderDetails, CreateOrdering, OrdersCatalog } from '@widgets/documentPageBody';
import ProductsCategories from '@widgets/productsPageBody';

import { EditPackageCategory } from '@features/editPackageCategory';
import { EditPackageForm } from '@features/editPackageForm';

import { AppRoutes } from '@shared/config/router/routesLinks';

export const routes: RouteObject[] = [
    { index: true, element: <Navigate to={AppRoutes.getDashboardRoute()} /> },
    {
        path: AppRoutes.getDocumentsRoute(),
        element: <DocumentsPage />,
        children: [
            { path: 'orders',  children: [
                {path: AppRoutes.getOrderDetailsRoute(':_id'), element: <OrderDetails />},
                {path: AppRoutes.getOrderAddProductsRoute(), element: <AddOrderProducts />},
                {path: AppRoutes.getOrderCreateRoute(), element: <CreateOrder />},
                {index: true, element: <OrdersCatalog />}
            ] },
            { path: AppRoutes.getOrderingsRoute(), children: [
                {path: AppRoutes.getOrderingsCreateRoute(),element: <CreateOrdering />},
                {index: true, element: <CreateOrdering/>},
            ] },
            { path: AppRoutes.getDistributionsRoute(), element: <Distribution /> },
            { index: true, element: <Navigate to={AppRoutes.getOrdersRoute()} /> },
            { path: '*', element: <Navigate to={AppRoutes.getOrdersRoute()} /> }
        ]
    },
    {
        path: AppRoutes.getInventoriesRoute(),
        element: <InventoryPage />,
        children: [
            { path: AppRoutes.getInventoryCreateRoute(), element: <InventoryCreate /> },
            { path: AppRoutes.getInventoryDetailsRoute(':number'), element: <InventoryEdit /> },
            { index: true, element: <InventoriesList /> },
            { path: '*', element: <Navigate to={AppRoutes.getInventoriesRoute()} /> }
        ]
    },
    {
        path: AppRoutes.getProductsRoute(),
        element: <ProductsPage />,
        children: [
            { path: AppRoutes.getProductsCategoriesRoute(), element: <ProductsCategories /> },
            { index: true, element: <Navigate to={AppRoutes.getProductsCategoriesRoute()} /> },
            { path: '*', element: <Navigate to={AppRoutes.getProductsCategoriesRoute()} /> }
        ]
    },
    {
        path: AppRoutes.getPackagesRoute(),
        element: <PackagesPage/>,
        children: [
            { path: AppRoutes.getPackagesRoute(), element: <EditPackageForm />},
            { path: 'category/create', element: <EditPackageCategory />},
            { index: true, element: <Navigate to={AppRoutes.getPackageCreateRoute()} /> },
            { path: '*', element: <Navigate to={AppRoutes.getPackageCreateRoute()} /> }
        ]
    },
    {
        path: AppRoutes.getProfileRoute(),
        element: <ProfilePage />
    },
    {
        path: AppRoutes.getLoginRoute(),
        element: <AuthPage />
    },
    {
        path: AppRoutes.getRegisterRoute(),
        element: <AuthPage />,
        
    },
    { path: '*', element: <Navigate to={AppRoutes.getDocumentsRoute()} /> }
];
export default routes;


