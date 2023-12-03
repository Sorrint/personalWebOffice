import { TableBody } from './tableBody';
import { TableHeader } from './tableHeader';

interface TableProps {
    data: ObjectRecord[]
    headers: ObjectRecord
}

export const Table = ({ data, headers }: TableProps) => {
    return (
        <>
            <div className="table-from-excel">
                <TableHeader headers={headers} />
                <TableBody records={data} headers={headers} />
            </div>
        </>
    );
};
