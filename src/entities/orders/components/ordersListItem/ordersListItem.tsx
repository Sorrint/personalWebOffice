import './ordersListItem.scss';
import { type IOrder } from '../../model/types/IOrder';
import { NavLink } from 'react-router-dom';

interface OrdersListItemProps {
    order: IOrder
}
export const OrdersListItem = ({ order }: OrdersListItemProps) => {
    const { orderName, _id } = order;
    // const orders = 
    return (
        <NavLink  to={`./${_id}`} className='orders__item'>{orderName}</NavLink>
    );
};