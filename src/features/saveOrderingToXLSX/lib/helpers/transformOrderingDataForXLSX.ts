import { type IOrdering, 
    getCorrugatesSheetsText, 
    getGrossweightText, 
    getPalletsText, 
    getShipmentDayText, 
    getSleepsheetsText } from '@entities/orderings';
import { getDeclensions } from '@shared/lib/helpers';
import { type IOrderingDataForXLSX } from '../../model/types';

export const transformOrderingDataForXLSX = (data: IOrdering): IOrderingDataForXLSX[] => {
    const {chaptersData, summaryData} = data
    const exportData: IOrderingDataForXLSX[] = []
    Object.values(chaptersData).map((chapter) => {
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

    const {corrugatedSheetsCount, palletsCount, slipSheetsCount, weights, shipmentDay} = summaryData;
    
    exportData.push({'№': ''})
    exportData.push({'№': getPalletsText(palletsCount)})
    exportData.push({'№': getSleepsheetsText(slipSheetsCount ?? 0)})
    exportData.push({'№': getCorrugatesSheetsText(corrugatedSheetsCount)})
    exportData.push({'№': getGrossweightText(weights)})
    exportData.push({'№': getShipmentDayText(shipmentDay ?? '')})
    return exportData;
};
