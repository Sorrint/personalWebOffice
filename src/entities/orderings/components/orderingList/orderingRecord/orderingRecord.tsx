import classNames from 'classnames';

import { type IOrderingRecordDisplay } from '../../../model/types/ordering';
import styles from  './orderingRecord.module.scss';

interface OrderingRecordProps {
    classname?: string
    record: Partial<IOrderingRecordDisplay>
    header?: boolean
}
export const OrderingRecord = ({record, header}: OrderingRecordProps) => {
    
    const recordStyles = classNames(
        styles.record,
        {
            [styles.header]: header
        }
    );
        
    return <div className={recordStyles}>
        <div className={classNames(styles.cell, styles.number)}>{record.number}</div>
        <div className={classNames(styles.cell, styles.name)}>{record.productName}</div>
        <div className={classNames(styles.cell, styles.count)}>{record.count}</div>
        <div className={classNames(styles.cell, styles.unit)}>{record.unit}</div>
        <div className={classNames(styles.cell, styles.rows)}>{record.rows}</div>
    </div>;
};