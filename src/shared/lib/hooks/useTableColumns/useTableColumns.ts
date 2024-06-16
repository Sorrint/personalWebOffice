import { TableContext } from '@shared/lib/context/tableContext';
import { useContext } from 'react';

export const useTableColumns = () => {
  const { columns } = useContext(TableContext);
  return columns || {};
};
