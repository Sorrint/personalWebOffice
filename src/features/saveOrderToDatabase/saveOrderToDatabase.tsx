import { FC } from 'react';
import { IOrder } from 'entities/orders/model/interfaces/IOrder';
import Button from 'shared/ui/button/button';
import { useAppDispatch } from 'shared/lib/hooks';
import { addOrder } from 'entities/orders/model/OrderSlice';

interface ISaveOrderCardProps {
    order: IOrder | undefined;
}

const SaveOrderToDatabase: FC<ISaveOrderCardProps> = ({ order }) => {
    const dispatch = useAppDispatch();
    const handleClick = (order: IOrder) => {
        dispatch(addOrder(order));
    };
    return <>{order && <Button onClick={() => handleClick(order)}>Сохранить заказ </Button>}</>;
};

export default SaveOrderToDatabase;
