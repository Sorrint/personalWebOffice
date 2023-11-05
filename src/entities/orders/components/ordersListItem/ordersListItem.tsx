import { NavLink } from 'react-router-dom';

import { type IOrder } from '../../model/types/IOrder';
import styles from './ordersListItem.module.scss';

interface OrdersListItemProps {
    order: IOrder
}
export const OrdersListItem = ({ order }: OrdersListItemProps) => {
    const { orderName, _id } = order;

    return (
        <NavLink  to={`./${_id}`} className={styles.item}>{orderName}</NavLink>
    );
};