import { type ReactNode, type CSSProperties } from 'react';
import { TableBody } from './tableBody';
import { TableHeader } from './tableHeader';
import styles from './table.module.scss';
import classNames from 'classnames';

export type TableAlignments = 'left' | 'right' | 'center';

export type TableHeaders<T> = {
  [K in keyof T]: {
    value: string | number | ReactNode | (() => ReactNode) | undefined;
    alignment?: TableAlignments;
  };
};

export interface TableData {
  highlight?: boolean;
}

export type TableViews = 'list' | 'grid';

interface TableProps<T extends TableData> {
  className?: string;
  data: T[];
  headers: Partial<TableHeaders<T>>;
  colTemplate?: string;
  hideHeaders?: boolean;
  onItemClick?: (item: T) => void;
  view?: TableViews;
  tabIndex?: number;
}

export const Table = <T extends ObjectRecord>({
  className,
  data,
  headers,
  colTemplate,
  hideHeaders,
  onItemClick,
  tabIndex,
  view,
}: TableProps<T>) => {
  const cssStyles = {
    '--col-template': colTemplate || '1fr',
    '--cursor': onItemClick ? 'pointer' : 'default',
  } as CSSProperties;

  const tableView = view ?? 'list';

  return (
    <table className={classNames(styles.table, styles[tableView], className)} style={cssStyles}>
      {!hideHeaders && <TableHeader headers={headers} view={tableView} />}
      <TableBody
        records={data}
        headers={headers}
        view={tableView}
        tabIndex={tabIndex}
        onItemClick={onItemClick}
      />
    </table>
  );
};
