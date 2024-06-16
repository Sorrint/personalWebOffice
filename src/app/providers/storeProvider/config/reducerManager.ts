import {
  type UnknownAction,
  combineReducers,
  type Reducer,
  type ReducersMapObject,
} from '@reduxjs/toolkit';
import {
  type StoreSchemaKey,
  type ReducerManager,
  type StoreSchema,
  type MountedReducers,
} from './storeSchema';

export function createReducerManager(
  initialReducers: ReducersMapObject<StoreSchema>,
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove: StoreSchemaKey[] = [];
  const mountedReducers: MountedReducers = {};
  return {
    getReducerMap: () => reducers,
    getMountedReducers: () => mountedReducers,

    reduce: (state: StoreSchema, action: UnknownAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (const key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      return combinedReducer(state, action);
    },

    add: (key: StoreSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;
      mountedReducers[key] = true;

      combinedReducer = combineReducers(reducers);
    },

    remove: (key: StoreSchemaKey) => {
      if (!key || !reducers[key]) {
        return;
      }

      delete reducers[key];
      keysToRemove.push(key);
      mountedReducers[key] = false;

      combinedReducer = combineReducers(reducers);
    },
  };
}
