import { useRoutes } from 'react-router-dom';
import { routes} from './routes';
import { Suspense } from 'react';
import { AuthProvider } from './providers/authProvider/components/authProvider';
import { UserSettingsProvider } from './providers/userSettingsProvider';

function App () {
    const elements = useRoutes(routes);
    return <>
        <Suspense fallback="">
            <AuthProvider>
                <UserSettingsProvider>
                    {elements}
                </UserSettingsProvider>
            </AuthProvider>
        </Suspense>
    </>;
}

export default App;
