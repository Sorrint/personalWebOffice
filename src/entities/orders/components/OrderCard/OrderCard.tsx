import { Children, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { useGetOrderRecords } from '@entities/orders/api/orderApi';

import { hasComponentName } from '@shared/lib/utils';
import { type TableColumns } from '@shared/ui/table/table';
import { ScrollableBlock } from '@shared/ui/ScrollableBlock';
import { Table } from '@shared/ui/table';

import { type IOrderRecord, type IOrder } from '../../model/types/IOrder';

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

export const OrderCard = ({ children }: OrderCardProps) => {
  const { orderNumber } = useParams();
  const { data: orderRecords } = useGetOrderRecords(Number(orderNumber), { skip: !orderNumber });

  if (!orderRecords) {
    return null;
  }

  const actions =
    children ?? Children.toArray(children).filter(child => hasComponentName(child, 'OrderActions'));

  return (
    <>
      {actions}
      <ScrollableBlock>
        <Table colTemplate={COLUMNS_WIDTHS} view='grid' columns={tableColumns}>
          <Table.Header />
          <Table.Body records={orderRecords} />
        </Table>
      </ScrollableBlock>
    </>
  );
};
