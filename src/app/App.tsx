import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { Suspense } from 'react';

function App () {
    const elements = useRoutes(routes);
    return <>
        <Suspense fallback="">
            {elements}
        </Suspense></>;
}

export default App;
