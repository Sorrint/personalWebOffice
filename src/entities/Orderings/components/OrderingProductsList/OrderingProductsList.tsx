import { memo } from 'react';
import { Loader } from '@shared/ui/Loaders';
import { type TableColumns, Table } from '@shared/ui/Table';
import { type OrderingRecordDisplay } from '../../model/types/ordering';
import { OrderingHeaders } from '../../consts/orderingHeaders';
import useTableData, { UseTableDataProps } from '../../lib/hooks/useTableData/useTableData';

interface OrderingProductsListProps extends UseTableDataProps {
  className?: string;
  isLoading?: boolean;
}

const columns: TableColumns<Partial<OrderingRecordDisplay>> = {
  number: { header: OrderingHeaders.NUMBER },
  productName: { header: OrderingHeaders.NAME, alignment: 'left' },
  count: { header: OrderingHeaders.COUNT },
  unit: { header: OrderingHeaders.UNIT },
  rows: { header: OrderingHeaders.ROWS },
};

export const OrderingProductsList = memo(
  ({ className, editRows, records, isLoading }: OrderingProductsListProps) => {
    const displayingRecords = useTableData({
      records,
      editRows,
    });
    const colTemplate = '40px minmax(360px, 1fr) 80px 80px 180px';

    if (!records) {
      return null;
    }
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          displayingRecords && (
            <Table className={className} colTemplate={colTemplate} columns={columns} view='grid'>
              <Table.Header />
              <Table.Body records={displayingRecords} />
            </Table>
          )
        )}
      </>
    );
  },
);

OrderingProductsList.displayName = 'OrderingProductsList';
