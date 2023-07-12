import { type FC } from 'react';
import { useSelector } from 'react-redux';

import { LoadOrderFromFile } from '@features/loadOrderFromFile';
import { SaveOrderToDatabase } from '@features/saveOrderToDatabase';
import { OrderCard, OrderControls, getCurrentOrder } from '@entities/orders';

export const OrderCardWithControls: FC = () => {
    const order = useSelector(getCurrentOrder());

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
