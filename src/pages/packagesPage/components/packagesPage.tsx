import { AppBody, AppHeader, AppLayout } from "@shared/layouts";
import { Header } from "@widgets/header";
import { NavBar } from "@widgets/navBar";
import { Outlet } from "react-router-dom";

const PackagesPage = () => {
    return  <><Header />
        <AppLayout style="wrapper">
            <NavBar />
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