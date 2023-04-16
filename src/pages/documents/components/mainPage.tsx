import { Header } from 'widgets/header';
import { NavBar } from 'widgets/navBar';

const MainPage = () => {
    return (
        <>
            <Header />
            <div className="app__body">
                <NavBar />
                <h1>Главная</h1>
            </div>
        </>
    );
};

export default MainPage;
