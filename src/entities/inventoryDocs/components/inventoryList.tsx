import { FC } from 'react';
import { IInventoryDocs } from '../model/types';
import './inventoryDocs.scss';
import InventoryListItem from './inventoryListItem';

interface IInventoryListProps {
    documents: IInventoryDocs[];
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
