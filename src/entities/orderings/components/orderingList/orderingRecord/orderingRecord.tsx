import classNames from 'classnames';

import { type IOrderingRecordDisplay } from '../../../model/types/ordering';
import styles from './orderingRecord.module.scss';
import { IconFont } from '@shared/ui/iconFont';

interface OrderingRecordProps {
  classname?: string;
  record: Partial<IOrderingRecordDisplay>;
  header?: boolean;
  editRows?: () => void;
}
export const OrderingRecord = ({ record, header, editRows }: OrderingRecordProps) => {
  const recordStyles = classNames(styles.record, {
    [styles.header]: header,
  });

  return (
    <div className={recordStyles}>
      <div className={classNames(styles.cell, styles.number)}>{record.number}</div>
      <div className={classNames(styles.cell, styles.name)}>{record.productName}</div>
      <div className={classNames(styles.cell, styles.count)}>{record.count}</div>
      <div className={classNames(styles.cell, styles.unit)}>{record.unit}</div>
      <div className={classNames(styles.cell, styles.rows)}>
        {record.rows}
        {editRows && (
          <IconFont
            iconName={'icon-more_vert'}
            classname={styles['edit-rows']}
            onClick={editRows}
          />
        )}
      </div>
    </div>
  );
};
