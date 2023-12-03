import { type FC } from 'react';
import { type IInventoryDocs } from '../../model/types';

import { InventoryListItem } from '../inventoryListItem/inventoryListItem';

interface IInventoryListProps {
    documents: IInventoryDocs[]
}

export const InventoryList: FC<IInventoryListProps> = ({ documents }) => {
    return (
        <>
            <h1>Список документов</h1>
            {documents.map((document) => (
                <InventoryListItem key={document._id} document={document} />
            ))}
        </>
    );
};
