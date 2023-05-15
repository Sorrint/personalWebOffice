import TableBody from './tableBody';
import TableHeader from './tableHeader';
import './table.scss';
import { FC } from 'react';
import { IHeaderItem, IRecord } from '../tableTypes';

interface ITableProps {
    data: IRecord[];
    headers: IHeaderItem;
}

const Table: FC<ITableProps> = ({ data, headers }) => {
    return (
        <>
            <div className="table-from-excel">
                <TableHeader headers={headers} />
                <TableBody records={data} headers={headers} />
            </div>
        </>
    );
};

export default Table;
