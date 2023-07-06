import { type IdataForXLSX, type IInventoryProduct } from '../../model/types';

export const transformDataForXLSX = (data: IInventoryProduct[]): IdataForXLSX[] => {
    const exportData: IdataForXLSX[] = data.reduce<IdataForXLSX[]>((result, product, index) => {
        const newObject = {
            '№ п/п': index + 1,
            Наименование: product.name,
            Количество: product.quantity,
            Цена: (product.price ?? 0),
            Сумма: (product.price ?? 0) * product.quantity
        };
        result.push(newObject);
        return result;
    }, []);
    const sum = data.reduce((result, product) => result + product.quantity * (product.price ?? 0), 0);
    exportData.push({ Наименование: 'Итого', Сумма: sum });
    return exportData;
};
