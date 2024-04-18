import classNames from 'classnames';
import { type TableHeaders, type TableViews } from './table';
import styles from './table.module.scss';
import { toReactNode } from './tableBody';
interface TableHeaderProps<T> {
  headers: Partial<TableHeaders<T>>;
  view: TableViews;
}

export const TableHeader = <T extends ObjectRecord>({ headers, view }: TableHeaderProps<T>) => {
  return (
    <>
      <thead className={classNames(styles.headers, styles[view])}>
        <tr className={classNames(styles.item, styles[view])}>
          {Object.entries(headers).map(([key, item]) => (
            <th className={classNames(styles.column, styles[view], styles.center)} key={key}>
              <span>{toReactNode(item?.value)}</span>
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};
