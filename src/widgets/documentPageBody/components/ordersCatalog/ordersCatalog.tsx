import { OrdersList, useGetOrdersListQuery } from '@entities/orders';
import { Container } from '@shared/layouts/container/container';

export const OrdersCatalog = () => {
  const { data: orders } = useGetOrdersListQuery();

  return <Container>{orders && <OrdersList orders={orders} />}</Container>;
};
