import { rtkApi } from '@shared/api/rtkApi';
import { OrderingRowDTO } from '../model/types/orderingRowDTO';

const baseURL = '/orderings/rows/';

const editOrderingRowsApi = rtkApi
  .enhanceEndpoints({ addTagTypes: ['orderings'] })
  .injectEndpoints({
    endpoints: build => ({
      updateOrderingRows: build.mutation<void, OrderingRowDTO>({
        query: orderingRowData => ({
          url: `${baseURL}update`,
          method: 'POST',
          body: orderingRowData,
        }),
        invalidatesTags: ['orderings'],
      }),
      resetOrderingRows: build.mutation<void, Omit<OrderingRowDTO, 'rowsCount'>>({
        query: data => ({
          url: `${baseURL}reset`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['orderings'],
      }),
    }),
  });

export const {
  useUpdateOrderingRowsMutation: useUpdateOrderingRows,
  useResetOrderingRowsMutation: useResetOrderingRows,
} = editOrderingRowsApi;
