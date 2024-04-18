import { memo } from 'react';

import { type TableHeaders } from '@shared/ui/table/components/table';
import { Table } from '@shared/ui/table';
import {
  type IInventoryProductDisplay,
  type IInventoryProduct,
  type IInventoryDocs,
} from '../../model/types';

import { type InventoryContentProps } from '../inventoryContent/inventoryContent';
import useTableData from '../../lib/hooks/useTableData';

export interface InventoryProductsTableProps extends Omit<InventoryContentProps, 'inventoryList'> {
  inventoryList: IInventoryDocs;
  highlightFunc?: ((item: IInventoryProduct) => boolean) | undefined;
}
const tableHeaders: TableHeaders<Partial<IInventoryProductDisplay>> = {
  number: { value: '№' },
  name: { value: 'Товары (работы, услуги)', alignment: 'left' },
  quantity: { value: 'Количество' },
  price: { value: 'Цена' },
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
      />
    );
  },
);

InventoryProductsTable.displayName = 'InventoryProductsTable';
