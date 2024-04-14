import { type ReactNode, memo } from 'react';
import { useAppSelector } from '@shared/lib/hooks';
import { Loader } from '@shared/ui/loaders';
import { type IOrderingRecordDisplay } from '../../model/types/ordering';
import { getIsLoading, getOrderingChaptersData } from '../../model/slice/OrderingSlice';
import { OrderingHeaders } from '../../consts/orderingHeaders';
import { Table } from '@shared/ui/table';
import useTableData from '../../lib/hooks/useTableData/useTableData';

interface OrderingListProps {
  className?: string;
  editRows?: (key: string) => ReactNode;
}

const headers: Partial<IOrderingRecordDisplay> = {
  number: OrderingHeaders.NUMBER,
  productName: OrderingHeaders.NAME,
  count: OrderingHeaders.COUNT,
  unit: OrderingHeaders.UNIT,
  rows: OrderingHeaders.ROWS,
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
