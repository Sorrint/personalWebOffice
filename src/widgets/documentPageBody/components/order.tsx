import { type FC } from 'react';

import { useAppSelector } from '@shared/lib/hooks';
import OrderCard from '@entities/orders/components/orderCard/orderCard';
import LoadOrderFromFile from '@features/loadOrderFromFile';
import OrderActions from '@entities/orders/components/orderCard/orderActions';
import { getCurrentOrder } from '@entities/orders/model/OrderSlice';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import SaveOrderToDatabase from '@features/saveOrderToDatabase/saveOrderToDatabase';
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
