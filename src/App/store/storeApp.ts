import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { inventoryDocsAPI } from 'entities/inventoryDocs';
import { productsAPI } from 'entities/products';
import { countersAPI } from 'shared/api/countersAPI';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import goodsReducer from 'entities/orders/model/OrderSlice';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [productsAPI.reducerPath, inventoryDocsAPI.reducerPath, countersAPI.reducerPath]
};

const rootReducer = combineReducers({
    goods: goodsReducer,
    [productsAPI.reducerPath]: productsAPI.reducer,
    [inventoryDocsAPI.reducerPath]: inventoryDocsAPI.reducer,
    [countersAPI.reducerPath]: countersAPI.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                }
            }).concat(productsAPI.middleware, inventoryDocsAPI.middleware, countersAPI.middleware)
    });
};
