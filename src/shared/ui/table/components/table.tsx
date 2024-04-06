import { TableBody } from './tableBody';
import { TableHeader } from './tableHeader';
import styles from './table.module.scss';

interface TableProps {
  data: ObjectRecord[];
  headers: ObjectRecord;
}

export const Table = ({ data, headers }: TableProps) => {
  return (
    <table className={styles.table}>
      <TableHeader headers={headers} />
      <TableBody records={data} headers={headers} />
    </table>
  );
};
