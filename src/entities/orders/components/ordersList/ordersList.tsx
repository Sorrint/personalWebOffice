import { useGetOrdersList } from '@entities/orders/api/orderApi';
import { AppLinksList } from '@shared/ui/AppLinksList';

export const OrdersList = () => {
  const { data: ordersLinks } = useGetOrdersList();

  return (
    <>
      {ordersLinks ? <AppLinksList list={ordersLinks} listTitle='Список заказов' /> : 'Нет заказов'}
    </>
  );
};
