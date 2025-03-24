import { type SyntheticEvent } from 'react';
import { type InventoryProductDisplay, type InventoryProduct } from '../../model/types';
import { IconFont } from '@shared/ui/IconFont';

interface UseTableDataProps {
  records?: InventoryProduct[];
  onDelete?: (product: InventoryProduct) => void;
  highlightFunc?: (item: InventoryProduct) => boolean;
}

const useTableData = ({
  records,
  onDelete,
  highlightFunc,
}: UseTableDataProps): InventoryProductDisplay[] => {
  if (!records) {
    return [];
  }

  const handleDelete = (e: SyntheticEvent, product: InventoryProduct) => {
    e.stopPropagation();
    if (onDelete) onDelete(product);
  };

  const tableData = records.reduce((acc: InventoryProductDisplay[], record, index) => {
    const data: InventoryProductDisplay = {
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
