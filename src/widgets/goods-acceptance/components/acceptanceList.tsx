import { Link } from 'react-router-dom';
import { inventoryDocsAPI } from '../../../entities/inventoryDocs';
import InventoryList from '../../../entities/inventoryDocs/components/inventoryList';
import { IInventoryDocs } from '../../../entities/inventoryDocs/model/IInventoryDoc';

const AcceptanceList = () => {
    const { data: documents, isLoading } = inventoryDocsAPI.useLoadAllDocumentsQuery();

    const renderDocuments = (list: IInventoryDocs[] | undefined) =>
        list ? <InventoryList documents={list} /> : <h2>Документов нет</h2>;

    return (
        <>
            <Link to={'./create'}>Новый документ</Link>
            {isLoading ? <h2>Идет загрузка</h2> : renderDocuments(documents)}
        </>
    );
};

export default AcceptanceList;
