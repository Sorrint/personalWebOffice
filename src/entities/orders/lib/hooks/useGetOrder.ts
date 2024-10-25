import { useParams } from 'react-router-dom';
import { useGetOrderById } from '@entities/orders/api/orderApi';

export const useGetOrder = () => {
  const { orderNumber } = useParams();
  if (!orderNumber) return { order: null, orderLoading: false };

  const { data: order, isLoading: orderLoading } = useGetOrderById(orderNumber);

  return { order, orderLoading };
};
