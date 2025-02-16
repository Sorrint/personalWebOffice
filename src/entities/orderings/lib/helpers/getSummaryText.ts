import { IPackageSummaryInfo } from '../../model/types/ordering';
import { getDeclensions } from '@shared/lib/helpers';

export const getPalletsText = (pallets: IPackageSummaryInfo[]) => {
  return (
    'Паллеты: ' +
    pallets
      .map(
        pallet =>
          `${pallet.count} ${pallet.name.replace('Паллета', 'шт на').replace('Поддон', getDeclensions(pallet.count, ['поддон', 'поддона', 'поддонов']))}`,
      )
      .join(', ')
  );
};

export const getCorrugatesSheetsText = (sheets: IPackageSummaryInfo[]) => `Гофролист:
${sheets.map(({ count, name }) => `${count} шт ${name}`).join(', ')}`;

export const getGrossweightText = (grossWeight: number) =>
  `Вес брутто ориентировочно: ${grossWeight > 0 ? grossWeight + ' кг' : ''}`;

export const getRowSeparatorText = ({ name, count }: IPackageSummaryInfo) => {
  return `${name} ${count > 0 ? count + ' шт' : ''}`;
};

export const getShipmentDayText = (date?: string) => {
  return `Отгрузка ориентировочно: ${date ?? ''}`;
};
