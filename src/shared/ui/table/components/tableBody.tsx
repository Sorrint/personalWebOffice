import { type ReactNode } from 'react';
import { type TableData, type TableHeaders, type TableViews } from './table';
import styles from './table.module.scss';
import classNames from 'classnames';
interface TableBodyProps<T extends TableData> {
  headers: Partial<TableHeaders<T>>;
  onItemClick?: (item: T) => void;
  records: T[];
  tabIndex?: number;
  view: TableViews;
}
export const toReactNode = (
  value: string | number | ReactNode | (() => ReactNode) | undefined,
): ReactNode => {
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
  onItemClick,
  tabIndex,
  view,
}: TableBodyProps<T>) => {
  return (
    <>
      <tbody className={classNames(styles.body, styles[view])}>
        {records.map((item, index) => (
          <tr
            key={index}
            className={classNames(styles.item, styles[view], {
              [styles.highlight]: item.highlight,
            })}
            onClick={() => onItemClick?.(item)}
            tabIndex={tabIndex}
          >
            {Object.keys(headers).map((headline: string) => (
              <td
                className={classNames(
                  styles.column,
                  styles[view],
                  styles[headers[headline]?.alignment || 'center'],
                )}
                key={headline}
              >
                {toReactNode(item?.[headline])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </>
  );
};
