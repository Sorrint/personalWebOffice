import { combineReducers, configureStore } from '@reduxjs/toolkit';
import goods from './reducers/GoodsSlice';
const rootReducer = combineReducers({
    goods
});

export const setupStore = () => {
    return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
