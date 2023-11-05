import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { transformDataForXLSX } from '../../lib/helpers';
import { type IInventoryProduct, type IdataForXLSX } from '../../model/types';
import { InventoryProductList } from '../inventoryProductsList/inventoryProductsList';

import { saveToXLSX } from '@shared/lib/utils/saveToXLSX';
import styles from './inventoryContent.module.scss';
import { useLoadDocumentByNumber } from '../../reducers/inventoryDocsService';
import { transformDate } from '@shared/lib/helpers';

export interface InventoryContentProps {
    onClick?: (product: IInventoryProduct) => void
    onDelete?: (product: IInventoryProduct) => void
    tabIndex?: number
}

export const InventoryContent = memo(({ onClick, onDelete, tabIndex }: InventoryContentProps) => {
    const { number } = useParams();
    if (number) {
        const { data: inventoryList, isLoading } = useLoadDocumentByNumber(number);

        if (isLoading) return <h1>{'Идет загрузка..'}</h1>;
        if (inventoryList != null) {
            const sum = inventoryList.products?.reduce(
                (result: number, product: IInventoryProduct) =>
                    product.price ? result + product.quantity * product.price : result,
                0);
            const date = transformDate(inventoryList.choosenDate);
            const handleClick = () => {
                const dataForXLSX = transformDataForXLSX(inventoryList.products);
                const xlsxName = `Инв. №${number} от ${date}.xlsx`;
                saveToXLSX<IdataForXLSX>(dataForXLSX, xlsxName);
            };

            return (
                <>
                    <button className={styles['create-xlsx']} onClick={handleClick}>
                        Скачать в формате XLSX
                    </button>
                    <h1>{`Инвентаризация № ${inventoryList.documentNumber} от ${date} магазина ${inventoryList.storeName}`}</h1>
                    <div className={styles['inventory-products-list']}>
                        <InventoryProductList
                            products={inventoryList.products}
                            onClick={onClick}
                            onDelete={onDelete}
                            tabIndex={tabIndex}
                        />
                        <div className={styles.total}>
                            <div>Итого</div>
                            <div className={styles.sum}>{sum.toFixed(2)} ₽</div>
                        </div>
                    </div>
                </>
            );
        }
    }
    return <h1>Ничего не найдено</h1>;
});
