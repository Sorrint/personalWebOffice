import { rtkApi } from '@shared/api/rtkApi';
import { AppLinkItem } from '@shared/ui/AppLinksList';
import { transformDitributionsList } from '../lib/helpers/transformDitributionsList';
import { IDistribution } from '../model/types/distribution';

const baseDistributionsUri = 'documents/distributions';

const distributionsApi = rtkApi
  .enhanceEndpoints({ addTagTypes: ['distributions'] })
  .injectEndpoints({
    endpoints: build => ({
      getDitributionsList: build.query<AppLinkItem[], void>({
        query: () => ({
          url: `${baseDistributionsUri}`,
          method: 'GET',
        }),
        transformResponse: transformDitributionsList,
        providesTags: () => ['distributions'],
      }),

      getDistributionById: build.query<IDistribution, string>({
        query: id => ({
          url: `documents/Ditributions/${id}`,
          method: 'GET',
        }),
        providesTags: () => ['distributions'],
      }),
    }),
  });

export const {
  useGetDitributionsListQuery: useGetDitributionsList,
  useGetDistributionByIdQuery: useGetDistributionById,
} = distributionsApi;
