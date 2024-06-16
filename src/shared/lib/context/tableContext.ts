import { TableColumns } from '@shared/ui/table';
import { createContext } from 'react';

export interface TableContextProps<T> {
  columns?: TableColumns<T>;
}

export const TableContext = createContext<TableContextProps<ObjectRecord>>({ columns: {} });
