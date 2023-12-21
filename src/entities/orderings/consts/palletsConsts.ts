import { getDeclensions } from '@shared/lib/helpers';
import { type ICorrugatedSheetsCount } from '../model/types/ordering';

export enum Pallets {
    PALLETS125 = 'pallets125',
    PALLETS99 = 'pallets99',
    PALLETS = 'pallets'
}

export const PalletsWeight = {
    [Pallets.PALLETS125]: 45000,
    [Pallets.PALLETS99]: 40000,
    [Pallets.PALLETS]: 20000
};

export const PalletsText: Record<Pallets, (count: number) => string> = {
    [Pallets.PALLETS125]: (count) => `${count} шт на 125`,
    [Pallets.PALLETS99]: (count) => `${count} шт на 99`,
    [Pallets.PALLETS]: (count: number) => `${count} ${getDeclensions(count, ['поддон', 'поддона', 'поддонов'])}`,
};

export const CorrugatedSheetsWeight: Record<keyof ICorrugatedSheetsCount, number> = {
    T21: 2000,
    T99_2: 1500
}