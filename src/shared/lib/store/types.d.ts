import { persistedReducer } from 'app/store/storeApp';

export type RootState = ReturnType<typeof rootReducer>;
export type PersistState = ReturnType<typeof persistedReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
