import { type IOrder } from '../../model/types/IOrder';
import styles from './ordersListItem.module.scss';
import { AppLink } from '@shared/ui/appLink';

interface OrdersListItemProps {
    order: IOrder
}
export const OrdersListItem = ({ order }: OrdersListItemProps) => {
    const { orderName, _id } = order;

    return (
        <AppLink  to={`./${_id}`} classname={styles.item}>{orderName}</AppLink>
    );
};