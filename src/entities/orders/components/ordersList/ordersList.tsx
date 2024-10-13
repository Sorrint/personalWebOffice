import { type IOrder } from '../../model/types/IOrder';
import { AppLink } from '@shared/ui/appLink';
import styles from './ordersList.module.scss';
import { FormatDate } from '@shared/ui/formatDate/FormatDate';

interface OrderListProps {
  orders: IOrder[];
}

export const OrdersList = ({ orders }: OrderListProps) => {
  return (
    <div className={styles.list}>
      {orders
        ? orders.map(order => (
            <AppLink key={order._id} to={`./${order._id}`} variant='panel'>
              {`Заказ №${order.orderNumber} от `}
              <FormatDate date={order.date} />
            </AppLink>
          ))
        : 'Документов нет'}
    </div>
  );
};
