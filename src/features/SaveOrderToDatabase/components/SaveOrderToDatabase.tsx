import { memo } from 'react';
import { useSaveCurrentOrder, type Order } from '@entities/Orders';

import { Button } from '@shared/ui/Button';

interface SaveOrderCardProps {
  order: Order;
}

export const SaveOrderToDatabase = memo(({ order }: SaveOrderCardProps) => {
  const [saveCurrentOrder] = useSaveCurrentOrder();
  const handleClick = (order: Order) => {
    saveCurrentOrder(order);
  };
  return (
    <>
      {order && (
        <Button
          onClick={() => {
            handleClick(order);
          }}
        >
          Сохранить заказ{' '}
        </Button>
      )}
    </>
  );
});

SaveOrderToDatabase.displayName = 'SaveOrderToDatabase';
