import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createStore } from '../config/storeApp';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { type StoreSchema } from '../config/storeSchema';
import { type Action, type ReducersMapObject } from '@reduxjs/toolkit';

interface StoreProviderProps {
    children?: ReactNode
    initialState: StoreSchema
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    asyncReducers: ReducersMapObject<StoreSchema, Action<any>>
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, asyncReducers, initialState } = props;

    const store = createStore(initialState, asyncReducers);
    const persistor = persistStore(store);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};
