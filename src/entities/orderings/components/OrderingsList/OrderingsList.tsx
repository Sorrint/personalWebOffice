import { memo } from 'react';
import { useGetOrderingsList } from '../../api/orderingsApi';
import { AppLinksList } from '@shared/ui/AppLinksList';

export const OrderingsList = memo(() => {
  const { data: orderingsLinks } = useGetOrderingsList();

  return (
    <>
      {orderingsLinks ? (
        <AppLinksList list={orderingsLinks} listTitle='Список порядовок' />
      ) : (
        'Нет порядовок'
      )}
    </>
  );
});
