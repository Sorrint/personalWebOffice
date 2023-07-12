import { type OrderState } from '@entities/orders';
import { type ProductsState } from '@entities/products';
import { type CombinedState, type AnyAction, type ReducersMapObject, type Reducer, type EmptyObject, type ThunkMiddleware } from '@reduxjs/toolkit';
import { type ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { type rtkApi } from '@shared/api/rtkApi';
import { type PersistPartial } from 'redux-persist/lib/persistReducer';

export interface StoreSchema {
    products: ProductsState
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    orders?: OrderState
    counter?: string
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

export interface StoreWithReducerManager extends ToolkitStore<EmptyObject & StoreSchema & PersistPartial, AnyAction, [ThunkMiddleware<EmptyObject & StoreSchema & PersistPartial, AnyAction>]> {
    reducerManager?: ReducerManager
}
