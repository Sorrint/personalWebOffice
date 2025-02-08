import { OrderCard, useGetOrder } from '@entities/orders';
import { LoadOrderFromFile } from '@features/loadOrderFromFile';

export const EditOrder = () => {
  const { order } = useGetOrder();
  // const navigate = useNavigate();
  // const [createNewOrder] = useCreateOrderMutation();
  // const handleSaveOrder = async () => {
  //   if (order) {
  //     const newOrder = await createNewOrder(order);
  //     if ('data' in newOrder) navigate(AppRoutes.getOrderDetailsRoute(newOrder.data._id));
  //   }
  // };

  if (!order) {
    return null;
  }

  return (
    <>
      <div>
        <LoadOrderFromFile />
        <OrderCard />
      </div>
    </>
  );
};
