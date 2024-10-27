import { rtkApi } from '@shared/api/rtkApi';
import {
  ICreateOrder,
  IOrderFillingErrors,
  IOrderRecord,
  type IOrder,
} from '../model/types/IOrder';
import { AppLinkItem } from '@shared/ui/AppLinksList';
import { transformOrdersList } from '../lib/helpers/transformOrdersList';

const baseOrdersUri = 'documents/orders';

interface AddOrderRecords {
  orderNumber: number;
  orderRecords: IOrderRecord[];
}

const orderApi = rtkApi
  .enhanceEndpoints({ addTagTypes: ['order', 'orderRecords'] })
  .injectEndpoints({
    endpoints: build => ({
      createOrder: build.mutation<IOrder, ICreateOrder>({
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

      saveCurrentOrder: build.mutation<IOrder, IOrder>({
        query: () => ({
          url: `${baseOrdersUri}/create`,
          method: 'POST',
        }),
        invalidatesTags: ['order'],
      }),

      addOrderRecords: build.mutation<IOrder, AddOrderRecords>({
        query: orderRecords => ({
          url: `${baseOrdersUri}/addRecords`,
          method: 'POST',
          body: orderRecords,
        }),
        invalidatesTags: ['orderRecords'],
      }),

      getOrderById: build.query<IOrder, string>({
        query: id => ({
          url: `${baseOrdersUri}/${id}`,
          method: 'GET',
        }),
        providesTags: () => ['order'],
      }),

      getOrderRecords: build.query<IOrderRecord[], number>({
        query: orderNumber => ({
          url: `${baseOrdersUri}/orderRecords/${orderNumber}`,
          method: 'GET',
        }),
        providesTags: () => ['orderRecords'],
      }),

      getOrderFillingErrors: build.query<IOrderFillingErrors, number>({
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
