import { FC } from 'react';
import { Link } from 'react-router-dom';

import { inventoryDocsAPI, InventoryList } from 'entities/inventoryDocs';
import { IInventoryDocs } from 'entities/inventoryDocs/model/types';

const InventoriesList: FC = () => {
    const { data: documents, isLoading } = inventoryDocsAPI.useLoadAllDocumentsQuery();

    const renderDocuments = (list: IInventoryDocs[] | undefined) =>
        list ? <InventoryList documents={list} /> : <h2>Документов нет</h2>;

    return (
        <>
            <Link className="create-link" to={'./create'}>
                Новый документ
            </Link>
            {isLoading ? <h2>Идет загрузка</h2> : renderDocuments(documents)}
        </>
    );
};

export default InventoriesList;
