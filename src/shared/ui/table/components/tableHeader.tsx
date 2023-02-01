import React, { FC } from 'react';
import { IHeaderItem } from '../tablleTypes';

interface ITableHeaderProps<T> {
    headers: T;
}

const TableHeader = <T,>({ headers }: ITableHeaderProps<T>) => {
    return (
        <>
            <div className="table-from-excel__headers">
                {Object.values(headers).map((item) => (
                    <div className="table-from-excel__header" key={item.id}>
                        <span>{item.text}</span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TableHeader;
