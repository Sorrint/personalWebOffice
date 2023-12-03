import { OrdersList, useGetOrdersListQuery } from '@entities/orders';

export const OrdersCatalog = () => {
    const {data: orders} = useGetOrdersListQuery();
    
    return <>{orders && <OrdersList orders={orders}/>}</>;
};