import { type IOrderResponse } from '@features/getOrderProductsWeight';
import { IOrderRecord, IOrderRecords } from '@entities/orders';
import { type IOrder } from '@entities/orders';
import { rtkApi } from '@shared/api/rtkApi';

export const documentsOrderApi = rtkApi
  .enhanceEndpoints({ addTagTypes: ['order'] })
  .injectEndpoints({
    endpoints: build => ({
      addOrderRecords: build.mutation<IOrderResponse, IOrderRecord[]>({
        query: orderRecords => ({
          url: 'documents/orders/addOrderRecords',
          method: 'POST',
          body: orderRecords,
        }),
      }),
      createOrder: build.mutation<Required<IOrder>, IOrder>({
        query: order => ({
          url: 'documents/orders/create',
          method: 'POST',
          body: order,
        }),
      }),
      updateOrderRecords: build.mutation<IOrderResponse, { record: IOrderRecords; id: string }>({
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
