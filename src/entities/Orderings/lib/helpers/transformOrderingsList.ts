import { type Order } from '@entities/Orders';
import { transformDate } from '@shared/lib/helpers';
import { type AppLinkItem } from '@shared/ui/AppLinksList';

export const transformOrderingsList = (list: Order[]): AppLinkItem[] =>
  list.map(({ _id: id, date, orderNumber, comment }) => {
    const numberString = `Порядовка к заказу № ${orderNumber}`;
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
