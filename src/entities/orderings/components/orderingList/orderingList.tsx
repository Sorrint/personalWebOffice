import { type ReactNode, memo } from 'react';
import { Loader } from '@shared/ui/loaders';
import { type TableColumns, Table } from '@shared/ui/table';
import { IOrderingChapter, type IOrderingRecordDisplay } from '../../model/types/ordering';
import { OrderingHeaders } from '../../consts/orderingHeaders';
import useTableData from '../../lib/hooks/useTableData/useTableData';

interface OrderingListProps {
  className?: string;
  records: IOrderingChapter[];
  editRows?: (key: string) => ReactNode;
  isLoading?: boolean;
}

const columns: TableColumns<Partial<IOrderingRecordDisplay>> = {
  number: { header: OrderingHeaders.NUMBER },
  productName: { header: OrderingHeaders.NAME, alignment: 'left' },
  count: { header: OrderingHeaders.COUNT },
  unit: { header: OrderingHeaders.UNIT },
  rows: { header: OrderingHeaders.ROWS },
};

export const OrderingList = memo(
  ({ className, editRows, records, isLoading }: OrderingListProps) => {
    const displayingRecords = useTableData({ records, editRows });
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

OrderingList.displayName = 'OrderingList';
