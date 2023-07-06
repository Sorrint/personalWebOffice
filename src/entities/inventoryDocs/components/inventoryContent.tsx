import { type FC } from 'react';
import { useParams } from 'react-router-dom';

import { inventoryDocsAPI } from '../reducers/inventoryDocsService';
import { transformDataForXLSX, transformDate } from '../lib/helpers';
import { type IInventoryProduct, type IdataForXLSX } from '../model/types';
import InventoryProductList from './inventoryProductsList';

import { saveToXLSX } from '@shared/lib/utils/saveToXLSX';

export interface IInventoryContent {
    onClick?: (product: IInventoryProduct) => void
    onDelete?: (product: IInventoryProduct) => void
    tabIndex?: number
}

const InventoryContent: FC<IInventoryContent> = ({ onClick, onDelete, tabIndex }) => {
    const { number } = useParams();
    if (number) {
        const { data: inventoryList, isLoading } = inventoryDocsAPI.useLoadDocumentByNumberQuery(number);

        if (isLoading) return <h1>{'Идет загрузка..'}</h1>;
        if (inventoryList != null) {
            const sum = inventoryList.products?.reduce(
                (result: number, product: IInventoryProduct) =>
                    product.price ? result + product.quantity * product.price : result,
                0
            )
               ;
            const date = transformDate(inventoryList.choosenDate);
            const handleClick = () => {
                const dataForXLSX = transformDataForXLSX(inventoryList.products);
                const xlsxName = `Инв. №${number} от ${date}.xlsx`;
                saveToXLSX<IdataForXLSX>(dataForXLSX, xlsxName);
            };

            return (
                <>
                    <button className="createXLSX" onClick={handleClick}>
                        Скачать в формате XLSX
                    </button>
                    <h1>{`Инвентаризация № ${inventoryList.documentNumber} от ${date} магазина ${inventoryList.storeName}`}</h1>
                    <div className="products-list">
                        <InventoryProductList
                            products={inventoryList.products}
                            onClick={onClick}
                            onDelete={onDelete}
                            tabIndex={tabIndex}
                        />
                        <div className="products-list__total">
                            <div className="products-list__title">Итого</div>
                            <div className="products-list__sum">{sum.toFixed(2)} ₽</div>
                        </div>
                    </div>
                </>
            );
        }
    }
    return <h1>Ничего не найдено</h1>;
};

export default InventoryContent;
