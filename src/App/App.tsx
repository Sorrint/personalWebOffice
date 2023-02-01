import { useRoutes } from 'react-router-dom';
import { useAppDispatch } from '../entities/goods/lib/hooks/redux';

import { Header } from '../widgets/header';
import { NavBar } from '../widgets/navBar';
import './app.scss';
import routes from './routes';

function App() {
    const elements = useRoutes(routes);
    return (
        <>
            <Header />
            <div className="app__wrapper">
                <NavBar />
                <div className="app__content">{elements}</div>
            </div>
        </>
    );
}

export default App;
