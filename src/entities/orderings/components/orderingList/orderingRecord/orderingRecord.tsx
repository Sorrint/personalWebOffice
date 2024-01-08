import classNames from 'classnames';
import { type ReactNode } from 'react';

import { type IOrderingRecordDisplay } from '../../../model/types/ordering';
import styles from './orderingRecord.module.scss';

interface OrderingRecordProps {
  classname?: string;
  record: Partial<IOrderingRecordDisplay>;
  header?: boolean;
  editRows?: () => ReactNode;
}

export const OrderingRecord = ({ record, header, editRows }: OrderingRecordProps) => {
  const getClass = (string: keyof typeof styles) => {
    return classNames(styles.cell, styles[string], {
      [styles.header]: header,
    });
  };

  return (
    <div className={styles.record}>
      <div className={getClass('number')}>{record.number}</div>
      <div className={getClass('name')}>{record.productName}</div>
      <div className={getClass('count')}>{record.count}</div>
      <div className={getClass('unit')}>{record.unit}</div>
      <div className={getClass('rows')}>
        {record.rows}
        {editRows?.()}
      </div>
    </div>
  );
};
