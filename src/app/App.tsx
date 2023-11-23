import { useRoutes } from 'react-router-dom';
import { routes} from './routes';
import { Suspense, useContext } from 'react';
import { AuthContext } from '@shared/lib/context/authContext';
import { AppLayout } from '@shared/layouts';
import { Header } from '@widgets/header';
import { SideBar } from '@widgets/sideBar';

function App () {
    const elements = useRoutes(routes);
    const {name: user} = useContext(AuthContext);

    return <>
        <Suspense fallback="">
            {user 
                ? <AppLayout 
                    header={<Header/>} 
                    sidebar={<SideBar/>}>
                    {elements}
                </AppLayout> 
                : <>{elements}</>}
        </Suspense>
    </>;
}

export default App;
