import { Navigate, RouteObject } from 'react-router-dom';

import DocumentsPage from '../pages/documents';
import ProductsPage from '../pages/goods';
import GoodsAcceptancePage from '../pages/acceptance';

import AcceptanceDocs from '../widgets/goods-acceptance';
import { Order, Ordering, Distribution } from '../widgets/documents';

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
            { path: 'documents', element: <AcceptanceDocs /> },
            { index: true, element: <Navigate to="./documents" /> },
            { path: '*', element: <Navigate to="./documents" /> }
        ]
    },
    {
        path: 'goods',
        element: <ProductsPage />,
        children: [
            { path: 'documents', element: <AcceptanceDocs /> },
            { index: true, element: <Navigate to="./documents" /> },
            { path: '*', element: <Navigate to="./documents" /> }
        ]
    },
    { path: '*', element: <Navigate to="./documents" /> }
];
export default routes;
