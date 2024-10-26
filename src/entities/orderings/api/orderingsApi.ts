import { rtkApi } from '@shared/api/rtkApi';
import { AppLinkItem } from '@shared/ui/AppLinksList';
import { transformOrderingsList } from '../lib/helpers/transformOrderingsList';
import { IOrdering } from '../model/types/ordering';

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

    getOrderingById: build.query<IOrdering, string>({
      query: id => ({
        url: `documents/orderings/${id}`,
        method: 'GET',
      }),
      providesTags: () => ['orderings'],
    }),
  }),
});

export const {
  useGetOrderingsListQuery: useGetOrderingsList,
  useGetOrderingByIdQuery: useGetOrderById,
} = orderingsApi;
