import { useSelector } from 'react-redux';

import { LoadOrderFromFile } from '@features/loadOrderFromFile';
import { OrderCard, getCurrentOrder } from '@entities/orders';
import { NavLink } from 'react-router-dom';

export const OrderCardWithControls = () => {
    const order = useSelector(getCurrentOrder());
    
    return (
        <>
            {!order && <LoadOrderFromFile />}
            {order?.ordering 
                ?         
                <NavLink to={`../../orderings/${order.ordering}`}>Перейти к порядовке</NavLink> 
                : 
                <NavLink to={`../../orderings/create?orderId=${order?._id}`}>Создать порядовку</NavLink>
            }
            {order && <OrderCard order={order}/>}
        </>
    );
};
