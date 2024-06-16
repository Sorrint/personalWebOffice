import classNames from 'classnames';
import styles from './table.module.scss';
import { useTableColumns } from '@shared/lib/hooks/useTableColumns/useTableColumns';
import { toReactNode } from '@shared/lib/helpers';

export const TableHeader = () => {
  const columns = useTableColumns();

  return (
    <>
      <thead className={classNames(styles.headers)}>
        <tr className={classNames(styles.item)}>
          {Object.entries(columns).map(([key, item]) => (
            <th className={classNames(styles.column, styles.center)} key={key}>
              <span>{toReactNode(item?.header)}</span>
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};
