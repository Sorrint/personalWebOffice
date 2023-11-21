import { type OrderState } from '@entities/orders';
import { type CombinedState, type AnyAction, type ReducersMapObject, type Reducer } from '@reduxjs/toolkit';
import { type EnhancedStore } from '@reduxjs/toolkit/dist/configureStore';
import { type rtkApi } from '@shared/api/rtkApi';
import { type SidebarState } from '@widgets/sideBar';
import { type AxiosInstance } from 'axios';

export interface StoreSchema {
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    orders?: OrderState
    counter?: string
    sidebar?: SidebarState
}

export type StoreSchemaKey = keyof StoreSchema
export type MountedReducers = OptionalRecord<StoreSchemaKey, boolean>;
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StoreSchema>
    reduce: (state: StoreSchema, action: AnyAction) => CombinedState<StoreSchema>
    add: (key: StoreSchemaKey, reducer: Reducer) => void
    remove: (key: StoreSchemaKey) => void
    getMountedReducers: () => MountedReducers
}

export interface StoreWithReducerManager extends EnhancedStore<StoreSchema> {
    reducerManager?: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StoreSchema
}
