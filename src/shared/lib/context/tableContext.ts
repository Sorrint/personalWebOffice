import { TableColumns } from '@shared/ui/Table';
import { createContext } from 'react';

export interface TableContextProps<T> {
  columns?: TableColumns<T>;
}

export const TableContext = createContext<TableContextProps<ObjectRecord>>({ columns: {} });
