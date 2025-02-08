import { IInventoryDocs } from '@entities/inventories';
import { transformDate } from '@shared/lib/helpers';
import { AppLinkItem } from '@shared/ui/AppLinksList';

export const transformInventoriesList = (list: IInventoryDocs[]): AppLinkItem[] =>
  list.map(({ _id: id, documentNumber, choosenDate: date, comment, totalSum }) => {
    const numberString = `Инвентаризация № ${documentNumber}`;
    const dateString = date && ` от ${transformDate(date)}.`;
    const commentString = comment && `${comment}.`;
    const sumString = totalSum && `Сумма: ${totalSum.toFixed(2)}`;

    const title = [numberString + dateString, commentString, sumString]
      .filter(Boolean)
      .join(`\u00A0\u00A0\u00A0`);

    return { id, title, to: `./${documentNumber}` };
  });
