import { type IOrderingChapter, type IOrderingRecordDisplay } from "../../model/types/ordering";
import { OrderingHeaders } from "../../consts/orderingHeaders";
import { OrderingChapter } from "./orderingChapter/orderingChapter";
import { OrderingRecord } from "./orderingRecord/orderingRecord";
import styles from './orderingList.module.scss';
import classNames from "classnames";
import { v4 as uuidv4 } from 'uuid';

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

export const OrderingList = (props: OrderingListProps) => {
    const {orderingRecords, className} = props;

    return (
        <div className={classNames(styles.ordering, className)}>
            <OrderingRecord header record={headers}/>
            {orderingRecords?.map(item => 
                <OrderingChapter 
                    key={item.summary.categoryName+uuidv4()}
                    orderingChapter={item} 
                />)}
        </div>
    );
};
