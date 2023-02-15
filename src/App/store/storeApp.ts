import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import goodsReducer from '../../entities/goods/model/reducers/GoodsSlice';
import { productsAPI } from '../../entities/products/api/productsService';

const rootReducer = combineReducers({
    goods: goodsReducer,
    [productsAPI.reducerPath]: productsAPI.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsAPI.middleware)
    });
};
