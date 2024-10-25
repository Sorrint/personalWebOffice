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
      const orderNumber = order.data.orderNumber;
      if (orderNumber) {
        navigate(AppRoutes.getOrderDetailsRoute(orderNumber?.toString()));
      }
    }
  };

  const initialValues = { documentNumber: orderNumber, company: 'Капитель' };

  return { onSubmit, initialValues };
};
