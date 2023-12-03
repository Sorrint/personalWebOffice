import { OrderCard, getCurrentOrder } from '@entities/orders';
import { LoadOrderFromFile } from '@features/loadOrderFromFile';
import { Button } from '@shared/ui/button';
import { useCreateOrderMutation } from '../../api/documentsOrderApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@shared/config/router';

export const CreateOrder = () => {
    const order = useSelector(getCurrentOrder());
    const navigate = useNavigate();
    const [createNewOrder] = useCreateOrderMutation();
    const handleSaveOrder = async () => {
        if (order) {
            const newOrder = await createNewOrder(order);
            if ('data' in newOrder) navigate(AppRoutes.getOrderDetailsRoute(newOrder.data._id));
        } 
    };

    return (
        <>
            <div>
                <LoadOrderFromFile/>
                {order && <Button onClick={handleSaveOrder}>Сохранить заказ</Button>}
                <OrderCard order={order}/>
            </div>
        </>
    );
};