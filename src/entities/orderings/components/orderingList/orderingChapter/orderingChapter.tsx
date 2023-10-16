import { getDeclensions } from '@shared/lib/helpers';
import { type IOrderingRecordDisplay, type IOrderingChapter } from '../../../model/types/ordering';
import { OrderingRecord } from '../orderingRecord/orderingRecord';

interface OrderingChapterProps {
    classname?: string
    orderingChapter: IOrderingChapter
}
export const OrderingChapter = ({orderingChapter}: OrderingChapterProps) => {
    const {records, summary} = orderingChapter;
    const {totalCount, text, rowsCount, countOfPackages} = summary;

    const displayCountRows = Math.round(rowsCount);
    const summaryRecord: Partial<IOrderingRecordDisplay> = {
        count: totalCount,
        productName: text ? text : `В ряду ${countOfPackages} шт.`,
        rows: countOfPackages ? `${displayCountRows} ${getDeclensions(displayCountRows, ['ряд', 'ряда', 'рядов'])} = ${displayCountRows*countOfPackages}` : ''
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