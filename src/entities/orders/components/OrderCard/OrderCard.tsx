import { useParams } from 'react-router-dom';

import { useGetOrderRecords } from '@entities/orders/api/orderApi';

import { type TableColumns } from '@shared/ui/table/table';
import { ScrollableBlock } from '@shared/ui/ScrollableBlock';
import { Table } from '@shared/ui/table';

import { type IOrderRecord } from '../../model/types/IOrder';
import { memo } from 'react';

const tableColumns: TableColumns<IOrderRecord> = {
  number: { header: '№' },
  productName: { header: 'Товары (работы, услуги)', alignment: 'left' },
  count: { header: 'Количество' },
  unit: { header: 'Ед.' },
};

const COLUMNS_WIDTHS = '30px minmax(500px, 1fr) 130px 130px';

export const OrderCard = memo(() => {
  const { orderNumber } = useParams();
  const { data: orderRecords } = useGetOrderRecords(Number(orderNumber), { skip: !orderNumber });

  if (!orderRecords) {
    return null;
  }

  return (
    <ScrollableBlock>
      <Table colTemplate={COLUMNS_WIDTHS} view='grid' columns={tableColumns}>
        <Table.Header />
        <Table.Body records={orderRecords} />
      </Table>
    </ScrollableBlock>
  );
});
