import { type Pallets, PalletsText } from '../../../consts/palletsConsts';
import { type IOrderingWeights, type ICountOfPallets } from '../../../model/types/ordering';
import { CorrugatedSheets } from '../../../consts/corrugatedSheetsConsts';
import { type ICorrugatedSheetsCount } from '../../../model/types/ordering';

export const getPalletsText = (palletsObj?: ICountOfPallets) => {
    return 'Паллеты: ' + Object.entries(PalletsText).reduce<string[]>((acc, item)=> {
        const palletsType = item[0] as Pallets
        const palletsCount = palletsObj ? palletsObj[palletsType] : 0
        if (palletsCount > 0) {
            acc.push(item[1](palletsCount))
        }
        return acc
    }, []).join(', ')
}

export const getCorrugatesSheetsText = (sheetsObject: Partial<ICorrugatedSheetsCount>) => {
    return 'Гофролист: ' + Object.entries(sheetsObject).reduce((acc: string[], item) => {
        const type = item[0] as keyof ICorrugatedSheetsCount
        const count = item[1]
        if (count > 0) {
            acc.push(`${count} шт ${CorrugatedSheets[type]}`);
        }
        return acc
    }, []).join(', ');
};

export const getGrossweightText = (weights: IOrderingWeights) => {
    const grossWeight = +(Object.values(weights).reduce((acc, value)=> acc+=value, 0) / 1000).toFixed(0)
    return `Вес брутто ориентировочно: ${grossWeight > 0 ? grossWeight + ' кг' : ''}`  
}

export const getSleepsheetsText = (count: number) => {
    return `ДВП неконд ${count > 0 ? count + ' шт' : ''}`
}

export const getShipmentDayText = (date?: Date) => {
    return `Отгрузка ориентировочно: ${date ?? ''}`
}