import { rtkApi } from '@shared/api/rtkApi';
import { AppLinkItem } from '@shared/ui/AppLinksList';
import { transformDistributionsList } from '../lib/helpers/transformDitributionsList';
import { type Distribution } from '../model/types/distribution';

const baseDistributionsUri = 'documents/distributions';

const distributionsApi = rtkApi
  .enhanceEndpoints({ addTagTypes: ['distributions'] })
  .injectEndpoints({
    endpoints: build => ({
      getDistributionsList: build.query<AppLinkItem[], void>({
        query: () => ({
          url: `${baseDistributionsUri}`,
          method: 'GET',
        }),
        transformResponse: transformDistributionsList,
        providesTags: () => ['distributions'],
      }),

      getDistributionById: build.query<Distribution, string>({
        query: id => ({
          url: `documents/Distributions/${id}`,
          method: 'GET',
        }),
        providesTags: () => ['distributions'],
      }),
    }),
  });

export const {
  useGetDistributionsListQuery: useGetDistributionsList,
  useGetDistributionByIdQuery: useGetDistributionById,
} = distributionsApi;
