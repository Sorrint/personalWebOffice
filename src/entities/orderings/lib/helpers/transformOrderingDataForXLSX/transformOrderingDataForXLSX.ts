import { getDeclensions, transformDate } from '@shared/lib/helpers';
import { type IOrdering, type IOrderingDataForXLSX } from '../../../model/types/ordering';
import { getPalletsInfoString } from '../getPalletsInfoString/getPalletsInfoString';
import { getCorrugatesSheetsString } from '../getCorrugatedSheetsString/getCorrugatesSheetsString';

export const transformOrderingDataForXLSX = (data: IOrdering): IOrderingDataForXLSX[] => {
    const {ordering, summary} = data
    const exportData: IOrderingDataForXLSX[] = []
    ordering.map((chapter) => {
        const  {records, summary} = chapter
        records.map(record => {
            exportData.push({
                '№': record.number,
                'Наименование': record.productName || record.productName,
                'Кол-во': record.count,
                'Ед.': record.unit,
            })
        })
        const displayCountRows = Math.round(summary.rowsCount);

        exportData.push({
            'Наименование': summary.text ? summary.text : `В ряду ${summary.countOfPackages} шт.`,
            'Кол-во': summary.countOfPackages,
            'Ряды': summary.countOfPackages ? `${displayCountRows} ${getDeclensions(displayCountRows, ['ряд', 'ряда', 'рядов'])} = ${displayCountRows*summary.countOfPackages}` : ''
        })
    })

    const {corrugatedSheetsCount, 
        grossWeight, 
        palletsCount, 
        shipmentDay, 
        slipSheetsCount} = summary;
    
    const pallets = getPalletsInfoString(palletsCount);

    const corrugatedSheets = getCorrugatesSheetsString(corrugatedSheetsCount);
    exportData.push({'№': ''})
    exportData.push({'№': `Паллеты: ${pallets}`})
    exportData.push({'№': `ДВП неконд: ${slipSheetsCount && slipSheetsCount} шт`})
    exportData.push({'№': `Гофролист: ${corrugatedSheets} шт`})
    exportData.push({'№': `Вес брутто ориентировочно: ${grossWeight && grossWeight.toFixed(0)} кг`})
    exportData.push({'№': `Отгрузка ориентировочно: ${shipmentDay && transformDate(shipmentDay)}`})
    return exportData;
};
