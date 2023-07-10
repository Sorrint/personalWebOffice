import { type FC } from 'react';
import { Link } from 'react-router-dom';

import { transformDate } from '../../lib/helpers/transformDate';
import { type IInventoryDocs } from '../../model/types';

import './inventoryDocs.scss';

interface IInventoryListItemProps {
    document: IInventoryDocs
}
export const InventoryListItem: FC<IInventoryListItemProps> = ({ document }) => {
    const { documentNumber, choosenDate, comment } = document;
    const date = transformDate(choosenDate);
    return (
        <>
            <Link
                to={`${documentNumber}`}
                className="inventory__item"
            >{`Инвентаризация № ${documentNumber} от ${date}. ${comment}`}</Link>
        </>
    );
};
