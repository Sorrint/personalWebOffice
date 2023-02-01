import { Navigate, RouteObject } from 'react-router-dom';
import { DocumentsPage } from '../pages/documents';
import { Order, Ordering } from '../widgets/documents';
import Distribution from '../widgets/documents/components/distribution';

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
    { path: '*', element: <Navigate to="./documents" /> }
];
export default routes;
