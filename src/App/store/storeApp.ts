import { combineReducers, configureStore } from '@reduxjs/toolkit';
import goodsReducer from '../../entities/goods/model/reducers/GoodsSlice';

const rootReducer = combineReducers({
    goods: goodsReducer
});

export const setupStore = () => {
    return configureStore({ reducer: rootReducer });
};
