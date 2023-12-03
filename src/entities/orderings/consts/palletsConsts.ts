import { getDeclensions } from '@shared/lib/helpers';

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

export const PalletsText: Record<string, (value: number) => string> = {
    [Pallets.PALLETS125] : () => 'шт на 125',
    [Pallets.PALLETS99]: () => 'шт на 99',
    [Pallets.PALLETS]: (count: number) => getDeclensions(count, ['поддон', 'поддона', 'поддонов']),
};