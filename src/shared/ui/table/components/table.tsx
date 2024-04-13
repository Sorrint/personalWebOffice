import { type CSSProperties } from 'react';
import { TableBody } from './tableBody';
import { TableHeader } from './tableHeader';
import styles from './table.module.scss';

interface TableProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [K in keyof T]: any }[];
  headers: T;
  colTemplate?: string;
}

export const Table = <T extends ObjectRecord>({ data, headers, colTemplate }: TableProps<T>) => {
  const cssStyles = {
    '--col-template': colTemplate || '1fr',
  } as CSSProperties;

  return (
    <table className={styles.table} style={cssStyles}>
      <TableHeader headers={headers} />
      <TableBody records={data} headers={headers} />
    </table>
  );
};
