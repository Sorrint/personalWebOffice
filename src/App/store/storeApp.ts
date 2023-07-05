import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { inventoryDocsAPI } from '@entities/inventoryDocs';
import { productsAPI } from '@entities/products';
import { countersAPI } from '@shared/api/countersAPI';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import ordersReducer from '@entities/orders/model/OrderSlice';
import productsReducer from '@entities/products/model/productSlice';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [productsAPI.reducerPath, inventoryDocsAPI.reducerPath, countersAPI.reducerPath]
};

const rootReducer = combineReducers({
    orders: ordersReducer,
    products: productsReducer,
    [productsAPI.reducerPath]: productsAPI.reducer,
    [inventoryDocsAPI.reducerPath]: inventoryDocsAPI.reducer,
    [countersAPI.reducerPath]: countersAPI.reducer
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

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
