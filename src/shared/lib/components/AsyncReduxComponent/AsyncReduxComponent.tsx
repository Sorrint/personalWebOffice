import { type StoreWithReducerManager, type StoreSchema, type StoreSchemaKey } from '@app/providers/storeProvider/config/storeSchema';
import { type Reducer } from '@reduxjs/toolkit';
import { useEffect, type FC, type ReactNode } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
    [name in StoreSchemaKey]?: Reducer<NonNullable<StoreSchema[name]>>
}

interface AsyncReduxComponentProps {
    children: ReactNode
    reducersList: ReducersList
    removeAfterUnmount?: boolean
}
export const AsyncReduxComponent: FC<AsyncReduxComponentProps> = (props) => {
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
                    dispatch({ type: '@@INIT orders reducer' });
                }
            });

            return () => {
                if (removeAfterUnmount) {
                    Object.keys(reducersList).forEach((name) => {
                        store.reducerManager?.remove(name as StoreSchemaKey);
                        dispatch({ type: '@@REMOVE orders reducer' });
                    });
                }
            };
        }
    }, []);

    return <>{children}</>;
};

// const isPersist = localStorage.getItem('dataBase') === 'localStorage';