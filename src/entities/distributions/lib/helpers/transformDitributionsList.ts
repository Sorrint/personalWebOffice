import { transformDate } from '@shared/lib/helpers';
import { IBaseOrder } from '@shared/types/baseOrder';
import { AppLinkItem } from '@shared/ui/AppLinksList';

export const transformDitributionsList = (list: IBaseOrder[]): AppLinkItem[] =>
  list.map(({ _id: id, date, orderNumber, comment }) => {
    const numberString = `Распаллетовка к заказу № ${orderNumber}`;
    const dateString = date && ` от ${transformDate(date)}.`;
    const commentString = comment && `${comment}.`;

    const title = [numberString + dateString, commentString]
      .filter(Boolean)
      .join('\u00A0\u00a0\u00a0');

    return {
      id,
      title,
      to: `./${orderNumber}`,
    };
  });
