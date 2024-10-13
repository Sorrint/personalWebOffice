import { rtkApi } from '@shared/api/rtkApi';
import { ICreateOrder, type IOrder } from '../model/types/IOrder';

const baseOrdersUri = 'documents/orders';

const orderApi = rtkApi.enhanceEndpoints({ addTagTypes: ['order'] }).injectEndpoints({
  endpoints: build => ({
    createOrder: build.mutation<IOrder, ICreateOrder>({
      query: order => ({
        url: `${baseOrdersUri}/create`,
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['order'],
    }),

    getOrdersList: build.query<IOrder[], void>({
      query: () => ({
        url: `${baseOrdersUri}`,
        method: 'GET',
      }),
      providesTags: () => ['order'],
    }),

    saveCurrentOrder: build.mutation<IOrder, IOrder>({
      query: () => ({
        url: `${baseOrdersUri}/create`,
        method: 'POST',
      }),
      invalidatesTags: ['order'],
    }),
  }),
});

export const {
  useGetOrdersListQuery: useGetOrdersList,
  useSaveCurrentOrderMutation: useSaveCurrentOrder,
  useCreateOrderMutation: useCreateOrder,
} = orderApi;
