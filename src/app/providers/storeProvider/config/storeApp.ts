import storage from 'redux-persist/lib/storage';
import { type ReducersMapObject, configureStore, type CombinedState } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { createReducerManager } from './reducerManager';
import { type StoreWithReducerManager, type StoreSchema } from './storeSchema';
import { rtkApi } from '@shared/api/rtkApi';
import { type Reducer } from 'redux';

export function createStore (initialState: StoreSchema, asyncReducers: ReducersMapObject<StoreSchema>) {
    const persistConfig = {
        key: 'root',
        storage,
        blacklist: [rtkApi.reducerPath],
        whitelist: ['persist']
    };

    const rootReducer = {
        ...asyncReducers,
        [rtkApi.reducerPath]: rtkApi.reducer
    };

    const reducerManager = createReducerManager(rootReducer);
    const persistedReducer = persistReducer(persistConfig, reducerManager.reduce as Reducer<CombinedState<StoreSchema>>);

    const store: StoreWithReducerManager = configureStore({
        reducer: persistedReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                }
            }).concat(rtkApi.middleware)
    });

    store.reducerManager = reducerManager;

    return store;
}
