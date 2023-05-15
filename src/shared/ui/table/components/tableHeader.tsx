import { FC } from 'react';
import { IHeaderItem } from '../tableTypes';

interface ITableHeaderProps {
    headers: IHeaderItem;
}

const TableHeader: FC<ITableHeaderProps> = ({ headers }) => {
    return (
        <>
            <div className="table-from-excel__headers">
                {Object.entries(headers).map(([key, value]) => (
                    <div className="table-from-excel__header" key={key}>
                        <span>{value}</span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TableHeader;
