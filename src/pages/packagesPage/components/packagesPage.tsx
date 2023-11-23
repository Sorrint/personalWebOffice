import { AppBody, AppHeader } from '@shared/layouts';
import { Outlet } from 'react-router-dom';

const PackagesPage = () => {
    return  (
        <>
            <AppHeader title="Упаковка"/>
            <AppBody>
                <Outlet />
            </AppBody>
        </>
    );
};

export default PackagesPage;