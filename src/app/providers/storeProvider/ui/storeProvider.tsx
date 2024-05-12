import { type UnknownAction, type ReducersMapObject } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { type ReactNode } from 'react';
import { Provider } from 'react-redux';

import { createStore } from '../config/storeApp';
import { type StoreSchema } from '../config/storeSchema';
import { type PersistPartial } from 'redux-persist/es/persistReducer';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StoreSchema>;

  asyncReducers?: DeepPartial<ReducersMapObject<StoreSchema, UnknownAction>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children, asyncReducers, initialState } = props;

  const store = createStore(
    initialState as StoreSchema & PersistPartial,
    asyncReducers as ReducersMapObject<StoreSchema, UnknownAction>,
  );
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
