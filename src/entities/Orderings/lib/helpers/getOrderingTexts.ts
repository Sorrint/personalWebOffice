import { IPackageSummaryInfo } from '../../model/types/ordering';
import { getDeclensions } from '@shared/lib/helpers';

export const getPalletsText = (pallets: IPackageSummaryInfo[]) => {
  return (
    'Паллеты: ' +
    pallets
      .map(pallet =>
        !pallet.count
          ? ''
          : `${pallet.count} ${pallet.name.replace('Паллета', 'шт на').replace('Поддон', getDeclensions(pallet.count, ['поддон', 'поддона', 'поддонов']))}`,
      )
      .filter(Boolean)
      .join(', ')
  );
};

export const getCorrugatesSheetsText = (sheets?: IPackageSummaryInfo[]) => `Гофролист:
${sheets
  ?.map(({ count, name }) => (!count ? '' : `${count} шт ${name}`))
  .filter(Boolean)
  .join(', ')}`;

export const getGrossweightText = (grossWeight: number) =>
  `Вес брутто ориентировочно: ${grossWeight > 0 ? grossWeight + ' кг' : ''}`;

export const getRowSeparatorText = ({ name, count }: IPackageSummaryInfo) =>
  `${name} ${count > 0 ? count + ' шт' : ''}`;

export const getShipmentDayText = (date?: string) => `Отгрузка ориентировочно: ${date ?? ''}`;

export const getCountInRowsText = (text?: string, countOfPackages?: number) =>
  (!!countOfPackages && `В ряду ${countOfPackages} шт.`) || text;

export const getRowsCountText = (rowsCount?: number, countOfPackages?: number) =>
  [
    rowsCount && `${rowsCount} ${getDeclensions(Number(rowsCount), ['ряд', 'ряда', 'рядов'])}`,
    countOfPackages && rowsCount && `${rowsCount * countOfPackages}`,
  ]
    .filter(Boolean)
    .join(' = ');
