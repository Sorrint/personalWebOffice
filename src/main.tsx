import React from 'react';
import ReactDOM from 'react-dom/client';
import '@app/styles/style.scss';

import { BrowserRouter } from 'react-router-dom';
import App from '@app/App';
import { StoreProvider } from '@app/providers';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StoreProvider>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </StoreProvider>
);
