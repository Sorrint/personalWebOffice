import { FC } from 'react';
import { Link } from 'react-router-dom';

import { transformDate } from '../lib/helpers/transformDate';
import { IInventoryDocs } from '../model/types';

import './inventoryDocs.scss';

interface IInventoryListItemProps {
    document: IInventoryDocs;
}
const InventoryListItem: FC<IInventoryListItemProps> = ({ document }) => {
    const { documentNumber, storeName, choosenDate, comment } = document;
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

export default InventoryListItem;
