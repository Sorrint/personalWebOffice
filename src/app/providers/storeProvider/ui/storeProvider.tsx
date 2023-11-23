import { type AnyAction, type ReducersMapObject } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { type ReactNode } from 'react';
import { Provider } from 'react-redux';

import { createStore } from '../config/storeApp';
import { type StoreSchema } from '../config/storeSchema';

interface StoreProviderProps {
    children?: ReactNode
    initialState?: DeepPartial<StoreSchema>
  
    asyncReducers?: DeepPartial<ReducersMapObject<StoreSchema, AnyAction>>
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, asyncReducers, initialState } = props;

    const store = createStore(initialState as StoreSchema, asyncReducers as ReducersMapObject<StoreSchema, AnyAction>);
    const persistor = persistStore(store);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};
