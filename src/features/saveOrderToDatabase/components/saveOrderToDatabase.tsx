import { memo } from 'react';
import { useSaveCurrentOrderMutation, type IOrder } from '@entities/orders';

import { Button } from '@shared/ui/button/button';

interface SaveOrderCardProps {
    order: IOrder
}

export const SaveOrderToDatabase = memo(({ order }: SaveOrderCardProps) => {
    const [ saveCurrentOrder ] = useSaveCurrentOrderMutation()
    const handleClick = (order: IOrder) => {
        saveCurrentOrder(order)
    };
    return <>{order && <Button onClick={() => { handleClick(order); }}>Сохранить заказ </Button>}</>;
});
