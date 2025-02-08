import { type SyntheticEvent } from 'react';
import { type IInventoryProductDisplay, type IInventoryProduct } from '../../model/types';
import { IconFont } from '@shared/ui/iconFont';

interface UseTableDataProps {
  records?: IInventoryProduct[];
  onDelete?: (product: IInventoryProduct) => void;
  highlightFunc?: (item: IInventoryProduct) => boolean;
}

const useTableData = ({
  records,
  onDelete,
  highlightFunc,
}: UseTableDataProps): IInventoryProductDisplay[] => {
  if (!records) {
    return [];
  }

  const handleDelete = (e: SyntheticEvent, product: IInventoryProduct) => {
    e.stopPropagation();
    if (onDelete) onDelete(product);
  };

  const tableData = records.reduce((acc: IInventoryProductDisplay[], record, index) => {
    const data: IInventoryProductDisplay = {
      ...record,
      priceString: `${record.price?.toFixed(2)} ₽`,
      number: index + 1,
      sum: `${record.price ? (record.price * record.quantity).toFixed(2) : 0} ₽`,
      delete: () => (
        <div
          onClick={e => {
            handleDelete(e, record);
          }}
        >
          <IconFont iconName='icon-close' color='danger' bold />
        </div>
      ),
    };

    if (highlightFunc && typeof highlightFunc === 'function') {
      data.highlight = highlightFunc?.(record);
    }

    acc.push(data);
    return acc;
  }, []);
  return tableData;
};

export default useTableData;
