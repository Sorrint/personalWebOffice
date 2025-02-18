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

export const getRowSeparatorText = ({ name, count }: IPackageSummaryInfo) => {
  return `${name} ${count > 0 ? count + ' шт' : ''}`;
};

export const getShipmentDayText = (date?: string) => {
  return `Отгрузка ориентировочно: ${date ?? ''}`;
};
