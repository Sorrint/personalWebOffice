import { type IOrder } from '../../model/types/IOrder';
import { Panel } from '@shared/ui/panel/panel';
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
            <Panel key={order.orderName}>
              <AppLink to={`./${order._id}`}>{order.orderName}</AppLink>
            </Panel>
          ))
        : 'Документов нет'}
    </div>
  );
};
