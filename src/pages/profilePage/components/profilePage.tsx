import { ProfilePageBody } from '@widgets/profilePageBody';
import { AppBody, AppLayout } from '@shared/layouts';
import { SideBar } from '@widgets/sideBar';
import { Header } from '@widgets/header';

const ProfilePage = () => {
    return (
        <>
            <Header />
            <AppLayout style="wrapper">
                <SideBar />
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
