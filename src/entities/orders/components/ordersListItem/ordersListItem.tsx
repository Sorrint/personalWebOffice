import { Panel } from '@shared/ui/panel/panel';
import { type IOrder } from '../../model/types/IOrder';
import { AppLink } from '@shared/ui/appLink';

interface OrdersListItemProps {
  order: IOrder;
}
export const OrdersListItem = ({ order }: OrdersListItemProps) => {
  const { orderName, _id } = order;

  return (
    <Panel>
      <AppLink to={`./${_id}`}>{orderName}</AppLink>
    </Panel>
  );
};
