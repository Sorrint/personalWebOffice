import { type OrderResponse } from '@features/GetOrderProductsWeight';
import { type OrderRecord, type OrderRecords, type Order } from '@entities/Orders';
import { rtkApi } from '@shared/api/rtkApi';

export const documentsOrderApi = rtkApi
  .enhanceEndpoints({ addTagTypes: ['order'] })
  .injectEndpoints({
    endpoints: build => ({
      addOrderRecords: build.mutation<OrderResponse, OrderRecord[]>({
        query: orderRecords => ({
          url: 'documents/orders/addOrderRecords',
          method: 'POST',
          body: orderRecords,
        }),
      }),
      createOrder: build.mutation<Required<Order>, Order>({
        query: order => ({
          url: 'documents/orders/create',
          method: 'POST',
          body: order,
        }),
      }),
      updateOrderRecords: build.mutation<OrderResponse, { record: OrderRecords; id: string }>({
        query: ({ record, id }) => ({
          url: `documents/orders/${id}`,
          method: 'PATCH',
          body: record,
        }),
        invalidatesTags: ['order'],
      }),
    }),
  });

export const {
  useCreateOrderMutation: useCreateOrder,
  useUpdateOrderRecordsMutation: useUpdateOrderRecords,
  useAddOrderRecordsMutation: useAddOrderRecords,
} = documentsOrderApi;
