import { CSSProperties } from 'react';
import styles from './Table.module.scss';
import classNames from 'classnames';
import { toReactNode } from '@shared/lib/helpers';
import { useTableColumns } from '@shared/lib/hooks';

export interface TableData {
  highlight?: boolean;
}
interface TableBodyProps<T extends TableData> {
  onItemClick?: (item: T) => void;
  records: T[];
  tabIndex?: number;
  highlightFunc?: (item: T) => boolean;
}

export const TableBody = <T extends ObjectRecord>({
  records,
  onItemClick,
  tabIndex,
  highlightFunc,
}: TableBodyProps<T>) => {
  const cssStyles = {
    '--cursor': onItemClick ? 'pointer' : 'default',
  } as CSSProperties;

  const columns = useTableColumns();

  return (
    <tbody className={classNames(styles.body)} style={cssStyles}>
      {records.map((item, index) => (
        <tr
          key={index}
          className={classNames(styles.item, {
            [styles.highlight]: highlightFunc?.(item),
          })}
          onClick={() => onItemClick?.(item)}
          tabIndex={tabIndex}
        >
          {Object.keys(columns).map((headline: string) => (
            <td
              className={classNames(
                styles.column,
                styles[columns[headline]?.alignment || 'center'],
              )}
              key={headline}
            >
              {toReactNode(item?.[headline])}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
