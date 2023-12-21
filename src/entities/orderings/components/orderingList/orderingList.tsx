import { memo } from 'react';
import classNames from 'classnames';

import { useAppSelector } from '@shared/lib/hooks';
import { Loader } from '@shared/ui/loaders';

import { type IOrderingChapter, type IOrderingRecordDisplay } from '../../model/types/ordering';
import { getIsLoading, getOrderingData } from '../../model/slice/OrderingSlice';
import { OrderingChapter } from './orderingChapter/orderingChapter';
import { OrderingRecord } from './orderingRecord/orderingRecord';
import { OrderingHeaders } from '../../consts/orderingHeaders';
import styles from './orderingList.module.scss';

interface OrderingListProps {
    orderingRecords?: IOrderingChapter[],
    className?: string
}

const headers: Partial<IOrderingRecordDisplay> = {
    count: OrderingHeaders.COUNT,
    number: OrderingHeaders.NUMBER,
    productName: OrderingHeaders.NAME,
    unit: OrderingHeaders.UNIT,
    rows: OrderingHeaders.ROWS
};

export const OrderingList = memo(({className}: OrderingListProps) => {
    const records = useAppSelector(getOrderingData)
    const isLoading = useAppSelector(getIsLoading)

    return (
        <div className={classNames(styles.ordering, className)}>
            <OrderingRecord header record={headers} />
            {isLoading ? <Loader/> : 
                records && Object.values(records)?.map(item =>
                    <OrderingChapter
                        key={item.summary.categoryName}
                        orderingChapter={item}
                    />)} 
        </div>
    );
});
