import { type IInventoryDocs, InventoryList, useLoadAllDocuments } from '@entities/inventoryDocs';
import { ButtonLink } from '@shared/ui/buttonLink';

import styles from './inventoriesList.module.scss'

export const InventoriesList = () => {
    const { data: documents, isLoading } = useLoadAllDocuments({});

    const renderDocuments = (list: IInventoryDocs[] | undefined) =>
        list ? <InventoryList documents={list} /> : <h2>Документов нет</h2>;

    return (
        <>
            <ButtonLink to={'./create'} classname={styles.link}>
                Новый документ
            </ButtonLink>
            {isLoading ? <h2>Идет загрузка</h2> : renderDocuments(documents)}
        </>
    );
};
