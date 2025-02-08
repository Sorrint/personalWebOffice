import { rtkApi } from '@shared/api/rtkApi';
import { AppLinkItem } from '@shared/ui/AppLinksList';
import { transformOrderingsList } from '../lib/helpers/transformOrderingsList';
import { IOrdering, IOrderingChapter, IOrderingSummaryData } from '../model/types/ordering';

const baseOrderingsUri = 'documents/orderings';

const orderingsApi = rtkApi
  .enhanceEndpoints({ addTagTypes: ['orderings', 'orderPackages'] })
  .injectEndpoints({
    endpoints: build => ({
      getOrderingsList: build.query<AppLinkItem[], void>({
        query: () => ({
          url: `orderings`,
          method: 'GET',
        }),
        transformResponse: transformOrderingsList,
        providesTags: () => ['orderings'],
      }),

      getOrderingRecords: build.query<IOrderingChapter[], number>({
        query: orderNumber => ({
          url: `/orderings/details/${orderNumber}`,
          method: 'GET',
        }),
        providesTags: () => ['orderings'],
      }),

      getOrderingPackageDetails: build.query<IOrderingSummaryData, number>({
        query: orderNumber => ({
          url: `orderPackages/info/${orderNumber}`,
          method: 'GET',
        }),
        providesTags: () => ['orderPackages'],
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
  useGetOrderingRecordsQuery: useGetOrderingRecords,
  useGetOrderingPackageDetailsQuery: useGetOrderingPackageDetails,
} = orderingsApi;
