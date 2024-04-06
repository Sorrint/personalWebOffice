import styles from './table.module.scss';
interface TableHeaderProps {
  headers: ObjectRecord;
}

export const TableHeader = ({ headers }: TableHeaderProps) => {
  return (
    <>
      <thead className={styles.body}>
        <tr className={styles.item}>
          {Object.entries(headers).map(([key, value]) => (
            <th className={styles.header} key={key}>
              <span>{value}</span>
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};
