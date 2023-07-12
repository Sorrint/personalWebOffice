import { type StoreWithReducerManager, type StoreSchema, type StoreSchemaKey } from '@app/providers/storeProvider/config/storeSchema';
import { type Reducer } from '@reduxjs/toolkit';
import { useEffect, type FC, type ReactNode } from 'react';
import { useStore } from 'react-redux';

export type ReducersList = {
    [name in StoreSchemaKey]?: Reducer<NonNullable<StoreSchema[name]>>
}

interface AsyncReduxComponentProps {
    children: ReactNode
    reducersList: ReducersList
    removeAfterUnmount?: boolean
}
export const AsyncReduxComponent: FC<AsyncReduxComponentProps> = (props) => {
    const { children, reducersList, removeAfterUnmount } = props;

    const store = useStore() as StoreWithReducerManager;

    useEffect(() => {
        const mountedReducers = store.reducerManager.getMountedReducers();

        Object.entries(reducersList).forEach(([name, reducer]) => {
            const isMounted = mountedReducers[name as StoreSchemaKey];
            if (isMounted !== undefined) {
                store.reducerManager.add(name as StoreSchemaKey, reducer);
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducersList).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StoreSchemaKey);
                });
            }
        };
    }, []);

    return <div>{children}</div>;
};
