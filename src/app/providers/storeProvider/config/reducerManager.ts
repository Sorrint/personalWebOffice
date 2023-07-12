import { combineReducers, type AnyAction, type Reducer, type ReducersMapObject } from '@reduxjs/toolkit';
import { type StoreSchemaKey, type ReducerManager, type StoreSchema } from './storeSchema';

export function createReducerManager (initialReducers: ReducersMapObject<StoreSchema>): ReducerManager {
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers);

    let keysToRemove: StoreSchemaKey[] = [];

    return {
        getReducerMap: () => reducers,
        reduce: (state: StoreSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                for (const key of keysToRemove) {
                    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
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
            combinedReducer = combineReducers(reducers);
        },

        remove: (key: StoreSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete reducers[key];

            keysToRemove.push(key);

            combinedReducer = combineReducers(reducers);
        }
    };
}
