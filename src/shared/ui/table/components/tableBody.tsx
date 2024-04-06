interface TableBodyProps {
  headers: ObjectRecord;
  records: ObjectRecord[];
}
import styles from './table.module.scss';

export const TableBody = ({ records, headers }: TableBodyProps) => {
  const alignColumnName = (text: string) => {
    return text.length > 8 ? styles.column_left : styles.column;
  };
  return (
    <>
      <tbody className={styles.body}>
        {records.map((item, index) => (
          <tr key={index} className={styles.item}>
            {Object.keys(headers).map((headline: string) => (
              <td className={alignColumnName(String(item[headline] ?? ''))} key={headline}>
                {item[headline] ?? ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </>
  );
};
