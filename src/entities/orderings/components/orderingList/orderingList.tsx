import { type ReactNode, memo } from 'react';
import { useAppSelector } from '@shared/lib/hooks';
import { Loader } from '@shared/ui/loaders';
import { type IOrderingRecordDisplay } from '../../model/types/ordering';
import { getIsLoading, getOrderingChaptersData } from '../../model/slice/OrderingSlice';
import { OrderingHeaders } from '../../consts/orderingHeaders';
import { Table } from '@shared/ui/table';
import useTableData from '../../lib/hooks/useTableData/useTableData';
import { type TableHeaders } from '@shared/ui/table/components/table';

interface OrderingListProps {
  className?: string;
  editRows?: (key: string) => ReactNode;
}

const headers: TableHeaders<Partial<IOrderingRecordDisplay>> = {
  number: { value: OrderingHeaders.NUMBER },
  productName: { value: OrderingHeaders.NAME, alignment: 'left' },
  count: { value: OrderingHeaders.COUNT },
  unit: { value: OrderingHeaders.UNIT },
  rows: { value: OrderingHeaders.ROWS },
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
          <Table
            className={className}
            data={displayingRecords}
            headers={headers}
            colTemplate={colTemplate}
            view='grid'
          />
        )
      )}
    </>
  );
});

OrderingList.displayName = 'OrderingList';
