import { memo } from 'react';
import { type IInventoryDocs } from '../../model/types';
import { InventoryListItem } from '../inventoryListItem/inventoryListItem';

interface InventoryListProps {
    documents: IInventoryDocs[]
}

export const InventoryList = memo(({ documents }: InventoryListProps) => {
    return (
        <>
            <h1>Список документов</h1>
            {documents.map((document) => (
                <InventoryListItem key={document._id} document={document} />
            ))}
        </>
    );
});
