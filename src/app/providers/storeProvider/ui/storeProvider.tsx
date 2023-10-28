import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createStore } from '../config/storeApp';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { type StoreSchema } from '../config/storeSchema';
import { type Action, type ReducersMapObject } from '@reduxjs/toolkit';

interface StoreProviderProps {
    children?: ReactNode
    initialState?: DeepPartial<StoreSchema>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    asyncReducers?: DeepPartial<ReducersMapObject<StoreSchema, Action<any>>>
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, asyncReducers, initialState } = props;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const store = createStore(initialState as StoreSchema, asyncReducers as ReducersMapObject<StoreSchema, Action<any>>);
    const persistor = persistStore(store);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};
