import { useRoutes } from 'react-router-dom';
import { Suspense, useContext } from 'react';

import { SideBar, SidebarControlButton, sidebarActions,  } from '@widgets/sideBar';
import { isHiddenSidebar } from '@widgets/sideBar';
import { Header } from '@widgets/header';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { AuthContext } from '@shared/lib/context/authContext';
import { AppLayout } from '@shared/layouts';

import { routes} from './routes';

function App () {
    const elements = useRoutes(routes);
    const {name: user} = useContext(AuthContext);
    
    const dispatch = useAppDispatch()
    const isSidebarOpen = useAppSelector(isHiddenSidebar)
    const closeSidebar = () => isSidebarOpen && dispatch(sidebarActions.changeVisible())

    return <>
        <Suspense fallback="">
            {user 
                ? <AppLayout 
                    header={<Header sidebarButton={<SidebarControlButton/>} />} 
                    sidebar={<SideBar/>}
                    closeSidebar={closeSidebar}
                    isSidebarOpen={isSidebarOpen}
                >
                    {elements}
                </AppLayout> 
                : <>{elements}</>}
        </Suspense>
    </>;
}

export default App;
