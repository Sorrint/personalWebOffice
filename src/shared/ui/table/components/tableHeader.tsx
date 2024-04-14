import classNames from 'classnames';
import { type TableViews } from './table';
import styles from './table.module.scss';
interface TableHeaderProps {
  headers: ObjectRecord;
  view: TableViews;
}

export const TableHeader = ({ headers, view }: TableHeaderProps) => {
  return (
    <>
      <thead className={classNames(styles.headers, styles[view])}>
        <tr className={classNames(styles.item, styles[view])}>
          {Object.entries(headers).map(([key, value]) => (
            <th className={classNames(styles.column, styles[view])} key={key}>
              <span>{value}</span>
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};
