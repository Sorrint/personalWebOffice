import { type StoreWithReducerManager, type StoreSchema, type StoreSchemaKey } from '@app/providers/storeProvider';
import { type Reducer } from '@reduxjs/toolkit';
import { useEffect, type ReactNode } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
    [name in StoreSchemaKey]?: Reducer<NonNullable<StoreSchema[name]>>
}

interface AsyncReduxComponentProps {
    children: ReactNode
    reducersList: ReducersList
    removeAfterUnmount?: boolean
}
export const AsyncReduxComponent= (props: AsyncReduxComponentProps) => {
    const { children, reducersList, removeAfterUnmount = true } = props;
    const store = useStore() as StoreWithReducerManager;
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (store.reducerManager?.getMountedReducers()) {
            const mountedReducers = store.reducerManager.getMountedReducers();

            Object.entries(reducersList).forEach(([name, reducer]) => {
                const isMounted = mountedReducers[name as StoreSchemaKey];
                if (!isMounted) {
                    store.reducerManager?.add(name as StoreSchemaKey, reducer);
                    dispatch({ type: `@@INIT ${name} reducer` });
                }
            });

            return () => {
                if (removeAfterUnmount) {
                    Object.keys(reducersList).forEach((name) => {
                        store.reducerManager?.remove(name as StoreSchemaKey);
                        dispatch({ type: `@@REMOVE ${name} reducer` });
                    });
                }
            };
        }
    }, []);

    return <>{children}</>;
};