import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';
import { BrowserRouter } from 'react-router-dom';
import App from './App/App';
import { setupStore } from './entities/goods/model/goodsStore';
import { Provider } from 'react-redux';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
);
