import { useParams } from 'react-router-dom';
import { OrderCard } from '@entities/orders';
import { FlexColumn } from '@shared/ui/Flex';

export const OrderDetails = () => {
  const { orderNumber } = useParams();

  return (
    <FlexColumn gap='16'>
      {orderNumber && <div>{`Заказ №${orderNumber}`}</div>}
      <OrderCard />
    </FlexColumn>
  );
};
