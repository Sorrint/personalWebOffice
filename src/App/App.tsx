import { useRoutes } from 'react-router-dom';

import routes from './routes';

import { Header } from 'widgets/header';
import { NavBar } from 'widgets/navBar';

import './app.scss';

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
