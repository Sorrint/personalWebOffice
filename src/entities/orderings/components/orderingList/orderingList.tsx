import { type ReactNode, memo } from 'react';
import { useAppSelector } from '@shared/lib/hooks';
import { Loader } from '@shared/ui/loaders';
import { type IOrderingRecordDisplay } from '../../model/types/ordering';
import { getIsLoading, getOrderingChaptersData } from '../../model/slice/OrderingSlice';
import { OrderingHeaders } from '../../consts/orderingHeaders';
import { type TableColumns, Table } from '@shared/ui/table';
import useTableData from '../../lib/hooks/useTableData/useTableData';
interface OrderingListProps {
  className?: string;
  editRows?: (key: string) => ReactNode;
}

const columns: TableColumns<Partial<IOrderingRecordDisplay>> = {
  number: { header: OrderingHeaders.NUMBER },
  productName: { header: OrderingHeaders.NAME, alignment: 'left' },
  count: { header: OrderingHeaders.COUNT },
  unit: { header: OrderingHeaders.UNIT },
  rows: { header: OrderingHeaders.ROWS },
};

export const OrderingList = memo(({ className, editRows }: OrderingListProps) => {
  const records = useAppSelector(getOrderingChaptersData);
  const isLoading = useAppSelector(getIsLoading);
  const displayingRecords = useTableData({ records, editRows });
  const colTemplate = '40px minmax(360px, 1fr) 80px 80px 180px';
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
});

OrderingList.displayName = 'OrderingList';
