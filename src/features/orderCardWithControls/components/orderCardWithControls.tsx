import { useEffect, type FC } from 'react';

import { LoadOrderFromFile } from '@features/loadOrderFromFile';
import { SaveOrderToDatabase } from '@features/saveOrderToDatabase';
import { OrderCard, OrderControls, getCurrentOrder } from '@entities/orders';
import { useSelector, useStore } from 'react-redux';
import { type StoreWithReducerManager } from '@app/providers/storeProvider/config/storeSchema';
import { orderReducer } from '@entities/orders/model/slices/OrderSlice';

export const OrderCardWithControls: FC = () => {
    const store: StoreWithReducerManager = useStore();
    const order = useSelector(getCurrentOrder());

    useEffect(() => {
        store.reducerManager?.add('orders', orderReducer);

        return () => store.reducerManager?.remove('orders');
    }, []);

    return (
        <>
            {!order && <LoadOrderFromFile />}
            {order && <OrderCard order={order}>
                <OrderControls>
                    <LoadOrderFromFile />
                    <SaveOrderToDatabase order={order} />
                </OrderControls>
            </OrderCard>}
        </>
    );
};
