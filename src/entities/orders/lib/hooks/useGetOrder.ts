import { useGetOrderByIdQuery } from '@features/getOrderProductsWeight';
import { useParams } from 'react-router-dom';

export const useGetOrder = () => {
  const { id } = useParams();
  if (!id) return { order: null, orderLoading: false };

  const { data: order, isLoading: orderLoading } = useGetOrderByIdQuery(id);

  return { order, orderLoading };
};
