import { useCreateOrder } from '@entities/orders';
import { CreateDocumentValues } from '@features/CreateDocumentForm';
import { useGetCounter } from '@shared/api/countersAPI';
import { AppRoutes } from '@shared/config/router';
import { useNavigate } from 'react-router-dom';

export const useCreateOrderForm = () => {
  const navigate = useNavigate();
  const [createOrder] = useCreateOrder();
  const { data: orderNumber } = useGetCounter('orderNumber', { refetchOnMountOrArgChange: true });

  const onSubmit = async (data: CreateDocumentValues) => {
    const order = await createOrder({
      company: data.company,
      date: data.choosenDate,
      orderNumber: data.documentNumber,
      comment: data.comment,
    });

    if ('data' in order) {
      const orderId = order.data._id;
      if (orderId) {
        navigate(AppRoutes.getOrderDetailsRoute(orderId));
      }
    }
  };

  const initialValues = { documentNumber: orderNumber, company: 'Капитель' };

  return { onSubmit, initialValues };
};
