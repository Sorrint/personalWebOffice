import { Navigate, RouteObject } from 'react-router-dom';

import DocumentsPage from '../pages/documents';
import ProductsPage from '../pages/goods';
import GoodsAcceptancePage from '../pages/acceptance';

import { InventoriesList, InventoryCreate, InventoryEdit } from '../widgets/inventory';
import { Order, Ordering, Distribution } from '../widgets/documents';
import GoodsSearchList from '../widgets/goods-search-list';

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
        element: <GoodsAcceptancePage />,
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
    { path: '*', element: <Navigate to="./documents" /> }
];
export default routes;
