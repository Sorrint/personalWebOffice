import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';

import { BrowserRouter } from 'react-router-dom';
import App from './App/App';
import { Provider } from 'react-redux';
import { setupStore } from './App/store/storeApp';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

const store = setupStore();
let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
