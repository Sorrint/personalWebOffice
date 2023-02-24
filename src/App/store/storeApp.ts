import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { goodsReducer } from '../../entities/goods';
import { inventoryDocsAPI } from '../../entities/inventoryDocs';
import { countersAPI } from '../../shared/api/countersAPI';
import { productsAPI } from '../../entities/products';

const rootReducer = combineReducers({
    goods: goodsReducer,
    [productsAPI.reducerPath]: productsAPI.reducer,
    [inventoryDocsAPI.reducerPath]: inventoryDocsAPI.reducer,
    [countersAPI.reducerPath]: countersAPI.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(productsAPI.middleware, inventoryDocsAPI.middleware, countersAPI.middleware)
    });
};
