import { rtkApi } from '@shared/api/rtkApi';
// import { IOrderRecord, type IOrder } from '../model/types/IOrder';
import { AppLinkItem } from '@shared/ui/AppLinksList';
import { transformOrderingsList } from '../lib/helpers/transformOrderingsList';
import { IOrder } from '@entities/orders';

const baseOrdersUri = 'documents/orderings';

const orderApi = rtkApi
  .enhanceEndpoints({ addTagTypes: ['order', 'orderRecords'] })
  .injectEndpoints({
    endpoints: build => ({
      getOrdersList: build.query<AppLinkItem[], void>({
        query: () => ({
          url: `${baseOrdersUri}`,
          method: 'GET',
        }),
        transformResponse: transformOrderingsList,
        providesTags: () => ['order'],
      }),

      getOrderById: build.query<IOrder, string>({
        query: id => ({
          url: `documents/orders/${id}`,
          method: 'GET',
        }),
        providesTags: () => ['order'],
      }),
    }),
  });

export const { useGetOrdersListQuery: useGetOrdersList, useGetOrderByIdQuery: useGetOrderById } =
  orderApi;
