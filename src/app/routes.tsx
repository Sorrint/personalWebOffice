import { Navigate, type RouteObject } from 'react-router-dom';

import { DocumentsPage } from '@pages/DocumentsPage';
import { InventoryPage } from '@pages/InventoryPage';
import { PackagesPage } from '@pages/PackagesPage';
import { ProductsPage } from '@pages/ProductsPage';
import { ProfilePage } from '@pages/ProfilePage';
import { AuthPage } from '@pages/AuthPage';

import { CreateInventory, InventoriesList, InventoryEdit } from '@widgets/InventoryPageBody';
import {
  AddOrderProducts,
  CreateOrder,
  OrderDetails,
  OrderingDetails,
} from '@widgets/DocumentsPageBody';
import ProductsCategories from '@widgets/ProductsPageBody';

import { EditPackageCategory } from '@features/EditPackageCategory';
// import { EditPackageForm } from '@features/editPackageForm';

import { AppRoutes } from '@shared/config/router/routesLinks';
import { OrdersList } from '@entities/Orders';
import { OrderingsList } from '@entities/Orderings';
import { DistributionsList } from '@entities/Distributions';
import { Packages } from '@widgets/PackagesPageBody';

export const routes: RouteObject[] = [
  { index: true, element: <Navigate to={AppRoutes.getDashboardRoute()} /> },
  {
    path: AppRoutes.getDocumentsRoute(),
    element: <DocumentsPage />,
    children: [
      {
        path: 'orders',
        children: [
          { path: AppRoutes.getOrderDetailsRoute(':orderNumber'), element: <OrderDetails /> },
          {
            path: AppRoutes.getOrderAddProductsRoute(':orderNumber'),
            element: <AddOrderProducts />,
          },
          { path: AppRoutes.getOrderCreateRoute(), element: <CreateOrder /> },
          { index: true, element: <OrdersList /> },
        ],
      },
      {
        path: AppRoutes.getOrderingsRoute(),
        children: [
          { path: AppRoutes.getOrderingDetailsRoute(':orderNumber'), element: <OrderingDetails /> },
          { index: true, element: <OrderingsList /> },
        ],
      },
      { path: AppRoutes.getDistributionsRoute(), element: <DistributionsList /> },
      { index: true, element: <Navigate to={AppRoutes.getOrdersRoute()} /> },
      { path: '*', element: <Navigate to={AppRoutes.getOrdersRoute()} /> },
    ],
  },
  {
    path: AppRoutes.getInventoriesRoute(),
    element: <InventoryPage />,
    children: [
      { path: AppRoutes.getInventoryCreateRoute(), element: <CreateInventory /> },
      { path: AppRoutes.getInventoryDetailsRoute(':number'), element: <InventoryEdit /> },
      { index: true, element: <InventoriesList /> },
      { path: '*', element: <Navigate to={AppRoutes.getInventoriesRoute()} /> },
    ],
  },
  {
    path: AppRoutes.getProductsRoute(),
    element: <ProductsPage />,
    children: [
      { path: AppRoutes.getProductsCategoriesRoute(), element: <ProductsCategories /> },
      { index: true, element: <Navigate to={AppRoutes.getProductsCategoriesRoute()} /> },
      { path: '*', element: <Navigate to={AppRoutes.getProductsCategoriesRoute()} /> },
    ],
  },
  {
    path: AppRoutes.getPackagePageRoute(),
    element: <PackagesPage />,
    children: [
      { path: AppRoutes.getPackagesRoute(), element: <Packages /> },
      { path: AppRoutes.getPackagesCategoryCreateRoute(), element: <EditPackageCategory /> },
      { index: true, element: <Navigate to={AppRoutes.getPackagesRoute()} /> },
      { path: '*', element: <Navigate to={AppRoutes.getPackageCreateRoute()} /> },
    ],
  },
  {
    path: AppRoutes.getProfileRoute(),
    element: <ProfilePage />,
  },
  {
    path: AppRoutes.getLoginRoute(),
    element: <AuthPage />,
  },
  {
    path: AppRoutes.getRegisterRoute(),
    element: <AuthPage />,
  },
  { path: '*', element: <Navigate to={AppRoutes.getDocumentsRoute()} /> },
];
export default routes;
