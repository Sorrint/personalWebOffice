import { rtkApi } from '@shared/api/rtkApi';
import {
  type CreateOrder,
  type OrderFillingErrors,
  type OrderRecord,
  type OrderRecordsParams,
  type Order,
} from '../model/types/Order';
import { AppLinkItem } from '@shared/ui/AppLinksList';
import { transformOrdersList } from '../lib/helpers/transformOrdersList';
import { buildQueryString } from '@shared/lib/utils';

const baseOrdersUri = 'documents/orders';

interface AddOrderRecords {
  orderNumber: number;
  orderRecords: OrderRecord[];
}

const orderApi = rtkApi
  .enhanceEndpoints({ addTagTypes: ['order', 'orderRecords'] })
  .injectEndpoints({
    endpoints: build => ({
      createOrder: build.mutation<Order, CreateOrder>({
        query: order => ({
          url: `${baseOrdersUri}/create`,
          method: 'POST',
          body: order,
        }),
        invalidatesTags: ['order'],
      }),

      getOrdersList: build.query<AppLinkItem[], void>({
        query: () => ({
          url: `${baseOrdersUri}`,
          method: 'GET',
        }),
        transformResponse: transformOrdersList,
        providesTags: () => ['order'],
      }),

      saveCurrentOrder: build.mutation<Order, Order>({
        query: () => ({
          url: `${baseOrdersUri}/create`,
          method: 'POST',
        }),
        invalidatesTags: ['order'],
      }),

      addOrderRecords: build.mutation<Order, AddOrderRecords>({
        query: orderRecords => ({
          url: `${baseOrdersUri}/addRecords`,
          method: 'POST',
          body: orderRecords,
        }),
        invalidatesTags: ['orderRecords'],
      }),

      getOrderById: build.query<Order, string>({
        query: id => ({
          url: `${baseOrdersUri}/${id}`,
          method: 'GET',
        }),
        providesTags: () => ['order'],
      }),

      getOrderRecords: build.query<OrderRecord[], OrderRecordsParams>({
        query: ({ orderNumber, ...filter }) => ({
          url: `${baseOrdersUri}/orderRecords/${orderNumber}${buildQueryString(filter)}`,
          method: 'GET',
        }),
        providesTags: () => ['orderRecords'],
      }),

      getOrderFillingErrors: build.query<OrderFillingErrors, number>({
        query: orderNumber => ({
          url: `${baseOrdersUri}/fillingErrors/${orderNumber}`,
          method: 'GET',
        }),
      }),
    }),
  });

export const {
  useGetOrdersListQuery: useGetOrdersList,
  useSaveCurrentOrderMutation: useSaveCurrentOrder,
  useCreateOrderMutation: useCreateOrder,
  useAddOrderRecordsMutation: useAddOrderRecords,
  useGetOrderByIdQuery: useGetOrderById,
  useGetOrderRecordsQuery: useGetOrderRecords,
  useGetOrderFillingErrorsQuery: useGetOrderFillingErrors,
} = orderApi;
