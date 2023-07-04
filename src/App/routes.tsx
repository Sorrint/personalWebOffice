import { Navigate, RouteObject } from 'react-router-dom';

import DocumentsPage from 'pages/documents';
import ProductsPage from 'pages/products';
import InventoryPage from 'pages/inventory';

import { InventoriesList, InventoryCreate, InventoryEdit } from 'widgets/inventoryPageBody';
import { Distribution, Order, Ordering } from 'widgets/documentPageBody';
import ProfilePage from 'pages/profile/profilePage';
import ProductsCategories from 'widgets/productsPageBody';

const BaseURL = "office"

const routes: RouteObject[] = [
    { index: true, element: <Navigate to={`./${BaseURL}/documents`} /> },
    {
        path: `${BaseURL}/documents`,
        element: <DocumentsPage />,
        children: [
            { path: 'order', element: <Order /> },
            { path: 'ordering', element: <Ordering /> },
            { path: 'distribution', element: <Distribution /> },
            { index: true, element: <Navigate to={`./order`} /> },
            { path: '*', element: <Navigate to={`./order`} /> }
        ]
    },
    {
        path: `${BaseURL}/inventory-lists`,
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
            { index: true, element: <Navigate to={`./documents`} /> },
            { path: '*', element: <Navigate to={`./documents`} /> }
        ]
    },
    {
        path: `${BaseURL}/products`,
        element: <ProductsPage />,
        children: [
            { path: 'categories', element: <ProductsCategories /> },
            { index: true, element: <Navigate to={`./categories`} /> },
            { path: '*', element: <Navigate to={`./categories`} /> }
        ]
    },
    {
        path: `${BaseURL}/profile`,
        element: <ProfilePage />
    },
    { path: '*', element: <Navigate to={`./${BaseURL}/documents`} /> }
];
export default routes;
