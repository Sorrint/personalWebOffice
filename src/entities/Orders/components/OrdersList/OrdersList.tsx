import { memo } from 'react';
import { useGetOrdersList } from '@entities/Orders/api/orderApi';
import { AppLinksList } from '@shared/ui/AppLinksList';

export const OrdersList = memo(() => {
  const { data: ordersLinks } = useGetOrdersList();

  return (
    <>
      {ordersLinks ? <AppLinksList list={ordersLinks} listTitle='Список заказов' /> : 'Нет заказов'}
    </>
  );
});
