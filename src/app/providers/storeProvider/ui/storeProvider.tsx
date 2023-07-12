import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createStore } from '../config/storeApp';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

interface StoreProviderProps {
    children?: ReactNode
    initialState?: any
    asyncReducers?: any
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, asyncReducers, initialState } = props;

    const store = createStore(initialState, asyncReducers);
    const persistor = persistStore(store);

    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>;
};
