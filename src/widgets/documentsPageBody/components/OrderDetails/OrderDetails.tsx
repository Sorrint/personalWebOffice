import { useParams } from 'react-router-dom';
import {
  OrderCard,
  OrderFillingErrors,
  useGetOrderFillingErrors,
  useGetOrderRecords,
} from '@entities/orders';
import { FlexColumn } from '@shared/ui/Flex';

export const OrderDetails = () => {
  const { orderNumber } = useParams();
  const { data: fillingErrors, isLoading: fillingErrorsLoading } = useGetOrderFillingErrors(
    Number(orderNumber),
    {
      skip: !orderNumber,
    },
  );
  const { data: orderRecords, isLoading: orderRecordsLoading } = useGetOrderRecords(
    Number(orderNumber),
    { skip: !orderNumber },
  );

  if (orderRecordsLoading || fillingErrorsLoading) {
    return null;
  }

  return (
    <FlexColumn gap='16'>
      {orderNumber && <div>{`Заказ №${orderNumber}`}</div>}
      <OrderFillingErrors fillingErrors={fillingErrors} />
      <OrderCard orderRecords={orderRecords} />
    </FlexColumn>
  );
};
