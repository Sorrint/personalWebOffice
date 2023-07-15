import { type FC } from 'react';
import { type IOrder } from '@entities/orders/model/types/IOrder';
import { useAppDispatch } from '@shared/lib/hooks';
import { Button } from '@shared/ui/button/button';
import { saveCurrentOrder } from '@entities/orders/model/services/saveCurrentOrder/saveCurrentOrder';

interface ISaveOrderCardProps {
    order: IOrder | undefined
}

export const SaveOrderToDatabase: FC<ISaveOrderCardProps> = ({ order }) => {
    const dispatch = useAppDispatch();
    const handleClick = (order: IOrder) => {
        dispatch(saveCurrentOrder(order));
    };
    return <>{order && <Button onClick={() => { handleClick(order); }}>Сохранить заказ </Button>}</>;
};
