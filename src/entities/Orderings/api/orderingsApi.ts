import { rtkApi } from '@shared/api/rtkApi';
import { AppLinkItem } from '@shared/ui/AppLinksList';
import { transformOrderingsList } from '../lib/helpers/transformOrderingsList';
import { type OrderingChapter, type OrderingSummary } from '../model/types/ordering';

const baseOrderingsUri = '/orderings/';

const orderingsApi = rtkApi
  .enhanceEndpoints({ addTagTypes: ['orderings', 'orderPackages'] })
  .injectEndpoints({
    endpoints: build => ({
      getOrderingsList: build.query<AppLinkItem[], void>({
        query: () => ({
          url: baseOrderingsUri,
          method: 'GET',
        }),
        transformResponse: transformOrderingsList,
        providesTags: () => ['orderings'],
      }),

      getOrderingRecords: build.query<OrderingChapter[], number>({
        query: orderNumber => ({
          url: `${baseOrderingsUri}${orderNumber}/details`,
          method: 'GET',
        }),
        providesTags: () => ['orderings'],
      }),

      getOrderingSummary: build.query<OrderingSummary, number>({
        query: orderNumber => ({
          url: `${baseOrderingsUri}${orderNumber}/summary`,
          method: 'GET',
        }),
        providesTags: () => ['orderings'],
      }),
    }),
  });

export const {
  useGetOrderingsListQuery: useGetOrderingsList,
  useGetOrderingRecordsQuery: useGetOrderingRecords,
  useGetOrderingSummaryQuery: useGetOrderingSummary,
} = orderingsApi;
