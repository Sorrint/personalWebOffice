import { useParams } from 'react-router-dom';
import { type IOrderRecord, OrderCard } from '@entities/orders';
import { useGetOrderByIdQuery } from '@features/getOrderProductsWeight';
import { AppLink } from '@shared/ui/appLink';
import { Container } from '@shared/layouts/container/container';
import styles from './orderDetails.module.scss';

export const OrderDetails = () => {
  const { _id } = useParams();
  if (!_id) return 'Нет id';

  const { data: order, isLoading: orderLoading } = useGetOrderByIdQuery(_id);

  if (orderLoading) return <span>Идет загрузка</span>;

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
      <Container>
        {notAllProducts && (
          <AppLink to={`../../orders/addProducts?orderId=${order?._id}`}>
            Не все товары найдены в базе данных
          </AppLink>
        )}
        {order?.ordering ? (
          <AppLink to={`../../orderings/${order.ordering}`}>Перейти к порядовке</AppLink>
        ) : (
          <AppLink to={`../../orderings/create?orderId=${order?._id}`}>Создать порядовку</AppLink>
        )}
        <div className={styles.title}>{order?.orderName}</div>
      </Container>
      {order && transformedRecords && (
        <Container classname={styles.container}>
          <OrderCard order={{ ...order, orderRecords: transformedRecords }} />
        </Container>
      )}
    </>
  );
};
