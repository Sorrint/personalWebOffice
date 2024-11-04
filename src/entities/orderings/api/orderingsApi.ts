import { rtkApi } from '@shared/api/rtkApi';
import { AppLinkItem } from '@shared/ui/AppLinksList';
import { transformOrderingsList } from '../lib/helpers/transformOrderingsList';
import { IOrdering, IOrderingChapter } from '../model/types/ordering';

const baseOrderingsUri = 'documents/orderings';

const orderingsApi = rtkApi.enhanceEndpoints({ addTagTypes: ['orderings'] }).injectEndpoints({
  endpoints: build => ({
    getOrderingsList: build.query<AppLinkItem[], void>({
      query: () => ({
        url: `${baseOrderingsUri}`,
        method: 'GET',
      }),
      transformResponse: transformOrderingsList,
      providesTags: () => ['orderings'],
    }),

    getOrderingDetails: build.query<IOrderingChapter[], number>({
      query: orderNumber => ({
        url: `documents/orderingDetails/${orderNumber}`,
        method: 'GET',
      }),
      providesTags: () => ['orderings'],
    }),

    getOrderingById: build.query<IOrdering, string>({
      query: id => ({
        url: `${baseOrderingsUri}/${id}`,
        method: 'GET',
      }),
      providesTags: () => ['orderings'],
    }),
  }),
});

export const {
  useGetOrderingsListQuery: useGetOrderingsList,
  useGetOrderingByIdQuery: useGetOrderById,
  useGetOrderingDetailsQuery: useGetOrderingDetails,
} = orderingsApi;
