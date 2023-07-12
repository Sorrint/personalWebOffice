import { type OrderState } from '@entities/orders';
import { type ProductsState } from '@entities/products';
import { type CombinedState, type AnyAction, type ReducersMapObject, type Reducer } from '@reduxjs/toolkit';
import { type EnhancedStore } from '@reduxjs/toolkit/dist/configureStore';
import { type rtkApi } from '@shared/api/rtkApi';

export interface StoreSchema {
    products: ProductsState
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    orders?: OrderState
    counter?: string
}

export type StoreSchemaKey = keyof StoreSchema

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StoreSchema>
    reduce: (state: StoreSchema, action: AnyAction) => CombinedState<StoreSchema>
    add: (key: StoreSchemaKey, reducer: Reducer) => void
    remove: (key: StoreSchemaKey) => void
}

export interface StoreWithReducerManager extends EnhancedStore<StoreSchema> {
    reducerManager?: ReducerManager
}