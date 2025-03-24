import { useParams } from 'react-router-dom';
import {
  OrderCard,
  OrderFillingErrorsList,
  useGetOrderFillingErrors,
  useGetOrderRecords,
} from '@entities/Orders';
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
    { orderNumber: Number(orderNumber) },
    { skip: !orderNumber },
  );

  if (orderRecordsLoading || fillingErrorsLoading || !orderNumber) {
    return null;
  }

  return (
    <FlexColumn gap='16'>
      <div>{`Заказ №${orderNumber}`}</div>
      <OrderFillingErrorsList fillingErrors={fillingErrors} />
      <OrderCard orderRecords={orderRecords} />
    </FlexColumn>
  );
};
