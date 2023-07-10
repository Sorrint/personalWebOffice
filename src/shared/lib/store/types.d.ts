import { type persistedReducer } from '@app/store/storeApp';

export type RootState = ReturnType<typeof rootReducer>;
export type PersistState = ReturnType<typeof persistedReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export interface MutationResult<T> {
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
    error: unknown
    data: T | undefined
}
