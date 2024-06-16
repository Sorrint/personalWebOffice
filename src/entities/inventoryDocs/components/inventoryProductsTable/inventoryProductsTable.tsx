import { memo } from 'react';

import { type TableHeaders } from '@shared/ui/table/components/table';
import { Table } from '@shared/ui/table';
import {
  type IInventoryProductDisplay,
  type IInventoryProduct,
  type IInventoryDocs,
} from '../../model/types';

import useTableData from '../../lib/hooks/useTableData';

export interface InventoryProductsTableProps {
  tabIndex: number;
  inventoryList: IInventoryDocs;
  onClick: (item: IInventoryProduct) => void;
  onDelete: (item: IInventoryProduct) => void;
  highlightFunc?: (item: IInventoryProduct) => boolean;
}
const tableHeaders: TableHeaders<Partial<IInventoryProductDisplay>> = {
  number: { value: '№' },
  name: { value: 'Товары (работы, услуги)', alignment: 'left' },
  quantity: { value: 'Количество' },
  priceString: { value: 'Цена' },
  sum: { value: 'Итого' },
  delete: { value: 'Удалить' },
};

const COLUMNS_WIDTHS = '30px minmax(500px, 1fr) 100px 100px 100px 30px';

export const InventoryProductsTable = memo(
  ({ inventoryList, tabIndex, onClick, onDelete, highlightFunc }: InventoryProductsTableProps) => {
    const list = useTableData({ records: inventoryList.products, onDelete, highlightFunc });

    const onItemClick = (item: IInventoryProductDisplay) => {
      const listItem = inventoryList?.products.find(({ id }) => id === item.id);
      listItem && onClick?.(listItem);
    };

    return (
      <Table
        data={list}
        headers={tableHeaders}
        hideHeaders
        colTemplate={COLUMNS_WIDTHS}
        onItemClick={onItemClick}
        tabIndex={tabIndex}
        highlightFunc={highlightFunc}
      />
    );
  },
);

InventoryProductsTable.displayName = 'InventoryProductsTable';
