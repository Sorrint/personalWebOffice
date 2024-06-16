import { Children, type ReactNode } from 'react';

import { hasComponentName } from '@shared/lib/utils';
import { Table } from '@shared/ui/table';

import { type IOrderRecord, type IOrder } from '../../model/types/IOrder';
import { type TableColumns } from '@shared/ui/table/table';
import { ScrollableBlock } from '@shared/ui/ScrollableBlock';

interface OrderCardProps {
  children?: ReactNode;
  order?: IOrder;
}

const tableColumns: TableColumns<IOrderRecord> = {
  number: { header: '№' },
  productName: { header: 'Товары (работы, услуги)', alignment: 'left' },
  count: { header: 'Количество' },
  unit: { header: 'Ед.' },
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
            <Table colTemplate={COLUMNS_WIDTHS} view='grid' columns={tableColumns}>
              <Table.Header />
              <Table.Body records={order.orderRecords} />
            </Table>
          </ScrollableBlock>
          {/* </div> */}
        </>
      )}
    </>
  );
};
