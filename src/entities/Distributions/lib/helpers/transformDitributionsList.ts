import { transformDate } from '@shared/lib/helpers';
import { type BaseOrder } from '@shared/types/baseOrder';
import { type AppLinkItem } from '@shared/ui/AppLinksList';

export const transformDistributionsList = (list: BaseOrder[]): AppLinkItem[] =>
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
