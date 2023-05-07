import { Navigate, RouteObject } from 'react-router-dom';

import DocumentsPage from 'pages/documents';
import ProductsPage from 'pages/goods';
import InventoryPage from 'pages/inventory';

import { InventoriesList, InventoryCreate, InventoryEdit } from 'widgets/inventory';
import { Distribution, Order, Ordering } from 'widgets/documents';
import GoodsSearchList from 'widgets/goods-search-list';
import ProfilePage from 'pages/profile/profilePage';

const routes: RouteObject[] = [
    { index: true, element: <Navigate to="./documents" /> },
    {
        path: 'documents',
        element: <DocumentsPage />,
        children: [
            { path: 'order', element: <Order /> },
            { path: 'ordering', element: <Ordering /> },
            { path: 'distribution', element: <Distribution /> },
            { index: true, element: <Navigate to="./order" /> },
            { path: '*', element: <Navigate to="./order" /> }
        ]
    },
    {
        path: 'inventory-lists',
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
            { index: true, element: <Navigate to="./documents" /> },
            { path: '*', element: <Navigate to="./documents" /> }
        ]
    },
    {
        path: 'goods',
        element: <ProductsPage />,
        children: [
            { path: 'categories', element: <GoodsSearchList /> },
            { index: true, element: <Navigate to="./categories" /> },
            { path: '*', element: <Navigate to="./categories" /> }
        ]
    },
    {
        path: 'profile',
        element: <ProfilePage />
    },
    { path: '*', element: <Navigate to="./documents" /> }
];
export default routes;
