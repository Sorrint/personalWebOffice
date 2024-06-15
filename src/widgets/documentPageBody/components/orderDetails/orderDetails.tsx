import { useParams } from 'react-router-dom';
import { type IOrderRecord, OrderCard } from '@entities/orders';
import { useGetOrderByIdQuery } from '@features/getOrderProductsWeight';
import { AppLink } from '@shared/ui/appLink';
import { FlexColumn } from '@shared/ui/Flex';

export const OrderDetails = () => {
  const { _id } = useParams();
  if (!_id) return 'Нет id';

  const { data: order, isLoading: orderLoading } = useGetOrderByIdQuery(_id);

  if (orderLoading) return <span>Идет загрузка</span>;
  if (!order) return;
  const { orderName, ordering } = order;
  const notAllProducts = order?.orderRecords.some(record => !record.product) ? true : false;

  const transformedRecords: IOrderRecord[] =
    order?.orderRecords.map(record => ({
      ...record,
      product: record.product?._id,
      productName: record.product?.name ?? record.productName,
      unit: record.unit?.description ?? '',
    })) ?? [];

  return (
    <>
      <FlexColumn gap='16'>
        {notAllProducts && (
          <AppLink to={`../../orders/addProducts?orderId=${_id}`}>
            Не все товары найдены в базе данных
          </AppLink>
        )}
        {order?.ordering ? (
          <AppLink to={`../../orderings/${ordering}`}>Перейти к порядовке</AppLink>
        ) : (
          <AppLink to={`../../orderings/create?orderId=${_id}`}>Создать порядовку</AppLink>
        )}
        {orderName && <div>{orderName}</div>}
        {order && transformedRecords && (
          <OrderCard order={{ ...order, orderRecords: transformedRecords }} />
        )}
      </FlexColumn>
    </>
  );
};
