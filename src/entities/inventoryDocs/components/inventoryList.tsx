import { type FC } from 'react';
import { type IInventoryDocs } from '../model/types';

import InventoryListItem from './inventoryListItem';

import './inventoryDocs.scss';

interface IInventoryListProps {
    documents: IInventoryDocs[]
}

const InventoryList: FC<IInventoryListProps> = ({ documents }) => {
    return (
        <>
            <h1>Список документов</h1>
            {documents.map((document) => (
                <InventoryListItem key={document._id} document={document} />
            ))}
        </>
    );
};

export default InventoryList;
