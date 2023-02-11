import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';
import { BrowserRouter } from 'react-router-dom';
import App from './App/App';
import { Provider } from 'react-redux';
import { setupStore } from './App/store/storeApp';

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
