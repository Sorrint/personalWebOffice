import { memo } from 'react';

import { transformDataForXLSX } from '../../lib/helpers';
import { type IInventoryDocs, type IInventoryProduct, type IdataForXLSX } from '../../model/types';
import { InventoryProductList } from '../inventoryProductsList/inventoryProductsList';

import { saveToXLSX } from '@shared/lib/utils/saveToXLSX';
import styles from './inventoryContent.module.scss';
import { transformDate } from '@shared/lib/helpers';

export interface InventoryContentProps {
    onClick?: (product: IInventoryProduct) => void
    onDelete?: (product: IInventoryProduct) => void
    tabIndex?: number
    inventoryList?: IInventoryDocs | undefined
    docNumber?: string
}

export const InventoryContent = memo(({ onClick, onDelete, tabIndex, inventoryList, docNumber }: InventoryContentProps) => {
    if (!inventoryList) return 'Нет данных для отображения'
    
    if (inventoryList != null) {
        const sum = inventoryList.products?.reduce(
            (result: number, product: IInventoryProduct) =>
                product.price ? result + product.quantity * product.price : result,
            0);
        const date = transformDate(inventoryList.choosenDate);
        const handleClick = () => {
            const dataForXLSX = transformDataForXLSX(inventoryList.products);
            const xlsxName = `Инв. №${docNumber} от ${date}.xlsx`;
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
});
