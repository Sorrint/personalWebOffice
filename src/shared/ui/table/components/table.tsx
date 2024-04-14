import { type ReactNode, type CSSProperties } from 'react';
import { TableBody } from './tableBody';
import { TableHeader } from './tableHeader';
import styles from './table.module.scss';
import classNames from 'classnames';

export type TableDataValue = string | number | ReactNode | (() => ReactNode) | undefined;
export type TableHeaders<T> = T;
export type TableData<T> = {
  [K in keyof T]: TableDataValue;
}[];

export type TableViews = 'list' | 'grid';

interface TableProps<T extends ObjectRecord> {
  className?: string;
  data: Partial<TableData<T>>;
  headers: TableHeaders<T>;
  colTemplate?: string;
  hideHeaders?: boolean;
  onItemClick?: () => void;
  view?: TableViews;
}

export const Table = <T extends ObjectRecord>({
  className,
  data,
  headers,
  colTemplate,
  hideHeaders,
  onItemClick,
  view,
}: TableProps<T>) => {
  const cssStyles = {
    '--col-template': colTemplate || '1fr',
    '--cursor': onItemClick ? 'pointer' : 'default',
  } as CSSProperties;

  return (
    <table
      className={classNames(styles.table, styles[view ?? 'list'], className)}
      style={cssStyles}
    >
      {!hideHeaders && <TableHeader headers={headers} view={view ?? 'list'} />}
      <TableBody records={data} headers={headers} view={view ?? 'list'} />
    </table>
  );
};
