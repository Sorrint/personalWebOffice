import { type IOrdering, type IOrderingRecordDisplay } from "../../model/types/ordering";
import { OrderingHeaders } from "../../consts/orderingHeaders";
import { OrderingChapter } from "./orderingChapter/orderingChapter";
import { OrderingRecord } from "./orderingRecord/orderingRecord";
import styles from './orderingList.module.scss';

interface OrderingListProps {
    orderingRecords?: IOrdering[]
}

const headers: Partial<IOrderingRecordDisplay> = {
    count: OrderingHeaders.COUNT,
    number: OrderingHeaders.NUMBER,
    productName: OrderingHeaders.NAME,
    unit: OrderingHeaders.UNIT,
    rows: OrderingHeaders.ROWS
};

export const OrderingList = (props: OrderingListProps) => {
    const {orderingRecords} = props;

    return (
        <div className={styles.ordering}>
            <OrderingRecord header record={headers}/>
            {orderingRecords?.map(item => 
                <OrderingChapter 
                    key={item.summary.categoryName}
                    orderingChapter={item} 
                />)}
        </div>
    );
};
