import { memo } from 'react';

import { type TableColumns, Table } from '@shared/ui/table';
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
const tableColumns: TableColumns<Partial<IInventoryProductDisplay>> = {
  number: {},
  name: { alignment: 'left' },
  quantity: {},
  priceString: {},
  sum: {},
  delete: {},
};

const COLUMNS_WIDTHS =
  '30px minmax(300px, 1fr) minmax(50px, 70px) minmax(80px, 100px) minmax(80px, 100px) 30px';

export const InventoryProductsTable = memo(
  ({ inventoryList, tabIndex, onClick, onDelete, highlightFunc }: InventoryProductsTableProps) => {
    const list: IInventoryProductDisplay[] = useTableData({
      records: inventoryList.products,
      onDelete,
      highlightFunc,
    });

    const onItemClick = (item: IInventoryProductDisplay) => {
      const listItem = inventoryList?.products.find(({ id }) => id === item.id);
      listItem && onClick?.(listItem);
    };

    return (
      <Table colTemplate={COLUMNS_WIDTHS} columns={tableColumns}>
        <Table.Body
          records={list}
          onItemClick={onItemClick}
          tabIndex={tabIndex}
          highlightFunc={highlightFunc}
        />
      </Table>
    );
  },
);

InventoryProductsTable.displayName = 'InventoryProductsTable';
