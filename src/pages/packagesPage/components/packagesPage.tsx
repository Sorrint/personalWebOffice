import { AppBody, AppHeader, AppLayout } from '@shared/layouts';
import { Header } from '@widgets/header';
import { SideBar } from '@widgets/sideBar';
import { Outlet } from 'react-router-dom';

const PackagesPage = () => {
    return  <><Header />
        <AppLayout style="wrapper">
            <SideBar />
            <AppLayout style="content">
                <AppHeader title="Упаковка">
                </AppHeader>
                <AppBody>
                    <Outlet />
                </AppBody>
            </AppLayout>
        </AppLayout>
    </>;
};

export default PackagesPage;