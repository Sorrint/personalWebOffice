import { Navigate, RouteObject } from 'react-router-dom';

import DocumentsPage from '../pages/documents';
import ProductsPage from '../pages/goods';
import GoodsAcceptancePage from '../pages/acceptance';

import { AcceptanceList, DocumentCreate, AddProducts } from '../widgets/goods-acceptance';
import { Order, Ordering, Distribution } from '../widgets/documents';
import GoodsSearchList from '../widgets/goods-search-list';
import { InventoryCard } from '../entities/inventoryDocs';

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
        path: 'goods-acceptance',
        element: <GoodsAcceptancePage />,
        children: [
            {
                path: 'documents',
                children: [
                    { path: 'create', element: <DocumentCreate /> },
                    {
                        path: ':number',
                        element: <InventoryCard />
                    },
                    {
                        path: ':number/addProducts',
                        element: <AddProducts />
                    },
                    { index: true, element: <AcceptanceList /> }
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
