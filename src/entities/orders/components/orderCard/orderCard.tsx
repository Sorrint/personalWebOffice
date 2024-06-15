import { Children, type ReactNode } from 'react';

import { hasComponentName } from '@shared/lib/utils';
import { Table } from '@shared/ui/table';

import { type IOrderRecord, type IOrder } from '../../model/types/IOrder';
import { type TableHeaders } from '@shared/ui/table/components/table';
import { ScrollableBlock } from '@shared/ui/ScrollableBlock';

interface OrderCardProps {
  children?: ReactNode;
  order?: IOrder;
}

const tableHeaders: TableHeaders<IOrderRecord> = {
  number: { value: '№' },
  productName: { value: 'Товары (работы, услуги)', alignment: 'left' },
  count: { value: 'Количество' },
  unit: { value: 'Ед.' },
};

const COLUMNS_WIDTHS = '30px minmax(500px, 1fr) 130px 130px';

export const OrderCard = ({ children, order }: OrderCardProps) => {
  if (!order) return null;
  const actions =
    children ?? Children.toArray(children).filter(child => hasComponentName(child, 'OrderActions'));

  return (
    <>
      {order && (
        <>
          {actions}
          {/* <div> */}
          <ScrollableBlock>
            <Table
              headers={tableHeaders}
              data={order.orderRecords}
              colTemplate={COLUMNS_WIDTHS}
              view='grid'
            />
          </ScrollableBlock>
          {/* </div> */}
        </>
      )}
    </>
  );
};
