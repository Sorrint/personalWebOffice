import { getDeclensions } from "@shared/lib/helpers";
import { type IOrderingRecordDisplay, type IOrderingChapter } from "../../../model/types/ordering";
import { OrderingRecord } from "../orderingRecord/orderingRecord";

interface OrderingChapterProps {
    classname?: string
    orderingChapter: IOrderingChapter
}
export const OrderingChapter = ({orderingChapter}: OrderingChapterProps) => {
    const {records, summary} = orderingChapter;

    const rowsCount = Math.floor(summary.totalCount/summary.countOfPackages);
    const summaryRecord: Partial<IOrderingRecordDisplay> = {
        count: summary.totalCount,
        productName: `В ряду ${summary.countOfPackages} шт.`,
        rows: `${rowsCount} ${getDeclensions(rowsCount, ['ряд', 'ряда', 'рядов'])} = ${rowsCount*summary.countOfPackages}`
    };

    return <>
        {records.map(record => 
            <OrderingRecord 
                key={record.number} 
                record={record}/>
        )}
        <OrderingRecord 
            record={summaryRecord} 
            header
        />
    </>;
};