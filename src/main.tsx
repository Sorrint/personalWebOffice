import React from 'react';
import ReactDOM from 'react-dom/client';
import '@app/styles/style.scss';

import { BrowserRouter } from 'react-router-dom';
import App from '@app/App';
import { StoreProvider } from '@app/providers/storeProvider';
import { AuthProvider } from '@app/providers/authProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Object.typedKeys = Object.keys as any;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StoreProvider>
    <BrowserRouter>
      <AuthProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AuthProvider>
    </BrowserRouter>
  </StoreProvider>,
);
