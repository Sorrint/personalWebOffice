import {
  type ReducersMapObject,
  type Reducer,
  type UnknownAction,
  EnhancedStore,
} from '@reduxjs/toolkit';

import { type SidebarState } from '@widgets/sideBar';
import { type rtkApi } from '@shared/api/rtkApi';
import { type TokenState } from '@shared/lib/store';
import { type PersistPartial } from 'redux-persist/es/persistReducer';
import { type EditProductFormState } from '@features/editProductForm';

export interface StoreSchema {
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

  counter: string | undefined;
  sidebar: SidebarState | undefined;
  tokens: TokenState | undefined;
  editProductForm: EditProductFormState | undefined;
}

export type StoreSchemaKey = keyof StoreSchema;
export type MountedReducers = OptionalRecord<StoreSchemaKey, boolean>;
export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StoreSchema>;
  reduce: (state: StoreSchema, action: UnknownAction) => StoreSchema;
  add: (key: StoreSchemaKey, reducer: Reducer) => void;
  remove: (key: StoreSchemaKey) => void;
  getMountedReducers: () => MountedReducers;
}

export interface StoreWithReducerManager extends EnhancedStore<StoreSchema & PersistPartial> {
  reducerManager?: ReducerManager;
}
