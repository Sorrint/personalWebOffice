import { IOrder } from '@entities/orders/model/types/IOrder';
import { transformDate } from '@shared/lib/helpers';
import { AppLinkItem } from '@shared/ui/AppLinksList';

export const transformOrdersList = (list: IOrder[]): AppLinkItem[] =>
  list.map(({ _id: id, date, orderNumber, comment }) => ({
    id,
    title: `Заказ №${orderNumber}${date ? ' от ' : ''}${transformDate(date)} ${comment ? comment : ''}`,
    to: `./${orderNumber}`,
  }));
