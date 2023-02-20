import { Link, useParams } from 'react-router-dom';
import { inventoryDocsAPI } from '../reducers/inventoryDocsService';
import InventoryProductList from './inventoryProductsList';
import { saveToXLSX } from '../../../shared/lib/utils/saveToXLSX';
import { transformDataForXLSX, transformDate } from '../lib/helpers';
import { IdataForXLSX, IInventoryProduct } from '../model/types';

const InventoryCard = () => {
    const { number } = useParams();
    if (number) {
        const { data: inventoryList, isLoading } = inventoryDocsAPI.useLoadDocumentByNumberQuery(number);

        if (isLoading) return <h1>'Идет загрузка..'</h1>;
        if (inventoryList) {
            const sum = inventoryList.products.reduce(
                (result: number, product: IInventoryProduct) => result + product.quantity * product.price,
                0
            );
            const date = transformDate(inventoryList.choosenDate);
            const handleClick = () => {
                const dataForXLSX = transformDataForXLSX(inventoryList.products);
                const xlsxName = `Инв. №${number} от ${date}.xlsx`;
                saveToXLSX<IdataForXLSX>(dataForXLSX, xlsxName);
            };

            return (
                <>
                    <Link to={`addProducts`}>Добавить товар</Link>
                    <button className="createXLSX" onClick={handleClick}>
                        Скачать в формате XLSX
                    </button>
                    <h1>{`Инвентаризация № ${inventoryList.documentNumber} от ${date} магазина ${inventoryList.storeName}`}</h1>
                    {inventoryList && (
                        <div className="products-list">
                            <InventoryProductList products={inventoryList.products} />
                            <div className="products-list__total">
                                <div className="products-list__title">Итого</div>
                                <div className="products-list__sum">{sum},00 ₽</div>
                            </div>
                        </div>
                    )}
                </>
            );
        }
    }
    return <h1>Ничего не найдено</h1>;
};

export default InventoryCard;
