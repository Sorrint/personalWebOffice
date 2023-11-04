import { Header } from '@widgets/header';
import './profile.scss';

import { ProfilePageBody } from '@widgets/profilePageBody';
import { AppBody, AppLayout } from '@shared/layouts';
import { NavBar } from '@widgets/sideBar';

const ProfilePage = () => {
    return (
        <>
            <Header />
            <AppLayout style="wrapper">
                <NavBar />
                <AppLayout style="content">
                    <AppBody>
                        <ProfilePageBody />
                    </AppBody>
                </AppLayout>
            </AppLayout>
        </>
    );
};

export default ProfilePage;
