import TableBody from './tableBody';
import TableHeader from './tableHeader';
import './table.scss';

interface ITableProps<T extends Object, U extends Object> {
    data: T;
    columns: U;
}

const Table = <T, U>({ data, columns }: ITableProps<T, U>) => {
    return (
        <>
            <TableHeader<U> headers={columns} />
            <TableBody<T, U> goods={data} headers={columns} />
        </>
    );
};

export default Table;
