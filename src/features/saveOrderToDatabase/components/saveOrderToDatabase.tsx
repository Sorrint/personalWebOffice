import { type FC } from 'react';
import { type IOrder } from '@entities/orders/model/interfaces/IOrder';
import { useAppDispatch } from '@shared/lib/hooks';
import { addOrder } from '@entities/orders/model/OrderSlice';
import { Button } from '@shared/ui/button/button';

interface ISaveOrderCardProps {
    order: IOrder | undefined
}

export const SaveOrderToDatabase: FC<ISaveOrderCardProps> = ({ order }) => {
    const dispatch = useAppDispatch();
    const handleClick = (order: IOrder) => {
        dispatch(addOrder(order));
    };
    return <>{order && <Button onClick={() => { handleClick(order); }}>Сохранить заказ </Button>}</>;
};
