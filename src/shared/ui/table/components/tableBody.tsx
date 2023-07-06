import { type FC } from 'react';
import { type IHeaderItem, type IRecord } from '../tableTypes';

interface ITableBodyProps {
    headers: IHeaderItem
    records: IRecord[]
}
const TableBody: FC<ITableBodyProps> = ({ records, headers }) => {
    const alignColumnName = (text: string) => {
        return text.length > 8 ? 'table-from-excel__column_left' : 'table-from-excel__column';
    };
    return (
        <>
            <div className="table-from-excel__body">
                {records.map((item, index) => (
                    <div key={index} className="table-from-excel__item">
                        {Object.keys(headers).map((headline: string) =>
                            item[headline]
                                ? (
                                    <div className={alignColumnName(String(item[headline]))} key={headline}>
                                        {item[headline]}
                                    </div>
                                )
                                : (
                                    <div className={alignColumnName('')} key={headline}>
                                        {''}
                                    </div>
                                )
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default TableBody;
