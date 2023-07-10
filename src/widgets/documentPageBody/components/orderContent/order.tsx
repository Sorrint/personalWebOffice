import { type FC } from 'react';

import LoadOrderFromFile from '@features/loadOrderFromFile';
import { SaveOrderToDatabase } from '@features/saveOrderToDatabase';
import { OrderActions, OrderCard, getCurrentOrder } from '@entities/orders';
import { useAppSelector } from '@shared/lib/hooks';

const Order: FC = () => {
    const order = useAppSelector(getCurrentOrder());

    return (
        <>
            {!order && <LoadOrderFromFile />}
            <OrderCard order={order}>
                <OrderActions>
                    <LoadOrderFromFile />
                    <SaveOrderToDatabase order={order} />
                </OrderActions>
            </OrderCard>
        </>
    );
};

export default Order;
