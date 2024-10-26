import { IOrder } from '@entities/orders/model/types/IOrder';
import { transformDate } from '@shared/lib/helpers';
import { AppLinkItem } from '@shared/ui/AppLinksList';

export const transformOrderingsList = (list: IOrder[]): AppLinkItem[] =>
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
