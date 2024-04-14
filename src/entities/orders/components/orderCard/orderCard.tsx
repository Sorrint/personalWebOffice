import { Children, type ReactNode } from 'react';

import { hasComponentName } from '@shared/lib/utils';
import { Table } from '@shared/ui/table';

import { type IOrder } from '../../model/types/IOrder';

interface OrderCardProps {
  children?: ReactNode;
  order?: IOrder;
}

const COLUMNS_WIDTHS = '30px minmax(500px, 1fr) 70px 30px';

export const OrderCard = ({ children, order }: OrderCardProps) => {
  if (!order) return null;
  const actions =
    children ?? Children.toArray(children).filter(child => hasComponentName(child, 'OrderActions'));
  const tableHeaders = {
    number: '№',
    productName: 'Товары (работы, услуги)',
    count: 'Количество',
    unit: 'Ед.',
  };

  return (
    <>
      {order && (
        <>
          {actions}
          <Table headers={tableHeaders} data={order.orderRecords} colTemplate={COLUMNS_WIDTHS} />
        </>
      )}
    </>
  );
};
