import { type IInventoryDocs, InventoryList, useLoadAllDocuments } from '@entities/inventoryDocs';

import styles from './inventoriesList.module.scss'
import { AppLink } from '@shared/ui/buttonLink';

export const InventoriesList = () => {
    const { data: documents, isLoading } = useLoadAllDocuments({});

    const renderDocuments = (list: IInventoryDocs[] | undefined) =>
        list ? <InventoryList documents={list} /> : <h2>Документов нет</h2>;

    return (
        <>
            <AppLink to={'./create'} classname={styles.link} buttonStyle>
                Новый документ
            </AppLink>
            {isLoading ? <h2>Идет загрузка</h2> : renderDocuments(documents)}
        </>
    );
};
