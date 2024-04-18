import { type IOrder } from '../../model/types/IOrder';
import { AppLink } from '@shared/ui/appLink';
import styles from './ordersList.module.scss';

interface OrderListProps {
  orders: IOrder[];
}

export const OrdersList = ({ orders }: OrderListProps) => {
  return (
    <div className={styles.list}>
      {orders
        ? orders.map(order => (
            <AppLink key={order._id} to={`./${order._id}`} variant='panel'>
              {order.orderName}
            </AppLink>
          ))
        : 'Документов нет'}
    </div>
  );
};
