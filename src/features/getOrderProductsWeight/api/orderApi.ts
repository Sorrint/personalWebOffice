import { rtkApi } from '@shared/api/rtkApi';
import { type IOrderResponse } from '../model/types/documents';

export const documentsOrderApi = rtkApi
  .enhanceEndpoints({ addTagTypes: ['order'] })
  .injectEndpoints({
    endpoints: build => ({
      getOrderById: build.query<IOrderResponse, string>({
        query: id => ({
          url: `documents/orders/${id}`,
          method: 'GET',
        }),
        providesTags: () => ['order'],
      }),
    }),
  });

export const { useGetOrderByIdQuery } = documentsOrderApi;
