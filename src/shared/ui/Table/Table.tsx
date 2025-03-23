import { type ReactNode, type CSSProperties } from 'react';
import classNames from 'classnames';
import { TableBody, TableData } from './tableBody';
import { TableHeader } from './tableHeader';
import styles from './Table.module.scss';
import { TableContext } from '@shared/lib/context/tableContext';

export type TableAlignments = 'left' | 'right' | 'center';

export type TableColumns<T> = {
  [K in keyof T]: {
    header?: ReactNode;
    alignment?: TableAlignments;
  };
};

export type TableViews = 'list' | 'grid';

interface TableProps<T extends TableData> {
  className?: string;
  children?: ReactNode;
  colTemplate?: string;
  columns: TableColumns<Partial<T>>;
  view?: TableViews;
}

export const Table = <T extends ObjectRecord>({
  children,
  className,
  colTemplate,
  columns,
  view,
}: TableProps<T>) => {
  const cssStyles = {
    '--col-template': colTemplate || '1fr',
  } as CSSProperties;

  const tableView = view ?? 'list';

  return (
    <TableContext.Provider value={{ columns }}>
      <table className={classNames(styles.table, styles[tableView], className)} style={cssStyles}>
        {children}
      </table>
    </TableContext.Provider>
  );
};

Table.Header = TableHeader;
Table.Body = TableBody;
