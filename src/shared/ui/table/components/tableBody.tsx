import { type ReactNode } from 'react';
import { type TableDataValue, type TableData, type TableHeaders, type TableViews } from './table';
import styles from './table.module.scss';
import classNames from 'classnames';
interface TableBodyProps<T extends ObjectRecord> {
  headers: TableHeaders<T>;
  records: Partial<TableData<T>>;
  view: TableViews;
}
const toReactNode = (value: TableDataValue): ReactNode => {
  if (!value) {
    return '';
  }

  if (typeof value === 'function') {
    return value();
  }

  return value.toString();
};

export const TableBody = <T extends ObjectRecord>({
  records,
  headers,
  view,
}: TableBodyProps<T>) => {
  const getColumnName = (text: string | undefined) => {
    const alignClassName = text && text.length > 8 ? styles['column-left'] : styles.column;
    return classNames(alignClassName, styles[view]);
  };

  return (
    <>
      <tbody className={classNames(styles.body, styles[view])}>
        {records.map((item, index) => (
          <tr key={index} className={classNames(styles.item, styles[view])}>
            {Object.keys(headers).map((headline: string) => (
              <td className={getColumnName(item?.[headline]?.toString())} key={headline}>
                {toReactNode(item?.[headline])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </>
  );
};
