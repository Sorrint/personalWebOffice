import { type FC } from 'react';
import { type IOrder } from '@entities/orders/model/types/IOrder';
import { useAppDispatch } from '@shared/lib/hooks';
import { Button } from '@shared/ui/button/button';
import { orderActions } from '@entities/orders';

interface ISaveOrderCardProps {
    order: IOrder | undefined
}

const { addOrder } = orderActions;

export const SaveOrderToDatabase: FC<ISaveOrderCardProps> = ({ order }) => {
    const dispatch = useAppDispatch();
    const handleClick = (order: IOrder) => {
        dispatch(addOrder(order));
    };
    return <>{order && <Button onClick={() => { handleClick(order); }}>Сохранить заказ </Button>}</>;
};
