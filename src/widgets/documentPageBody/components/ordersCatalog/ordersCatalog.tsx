import { OrdersList, useGetOrdersList } from '@entities/orders';

export const OrdersCatalog = () => {
  const { data: orders } = useGetOrdersList();

  return <>{orders && <OrdersList orders={orders} />}</>;
};
