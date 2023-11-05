import { useRoutes } from 'react-router-dom';
import { routes} from './routes';
import { Suspense } from 'react';
import { AuthProvider } from './providers/authProvider/components/authProvider';

function App () {
    const elements = useRoutes(routes);
    return <>
        <Suspense fallback="">
            <AuthProvider>
                {elements}
            </AuthProvider>
        </Suspense>
    </>;
}

export default App;
