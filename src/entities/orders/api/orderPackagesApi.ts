import { rtkApi } from '@shared/api/rtkApi';
import { Pallet, UpdateOrderPackagesDTO } from '../model/types/OrderPackages';

const baseOrderPackagesUri = '/orders';

const orderPackagesApi = rtkApi
  .enhanceEndpoints({ addTagTypes: ['orderPackages'] })
  .injectEndpoints({
    endpoints: build => ({
      getOrderPackages: build.query<Pallet[], number>({
        query: orderNumber => ({
          url: `${baseOrderPackagesUri}/${orderNumber}/packages`,
          method: 'GET',
        }),
        providesTags: () => ['orderPackages'],
      }),

      updateOrderPackages: build.mutation<{ success: boolean }, UpdateOrderPackagesDTO>({
        query: ({ pallets, orderNumber }) => ({
          url: `${baseOrderPackagesUri}/${orderNumber}/packages`,
          method: 'PATCH',
          body: { pallets },
        }),
      }),
    }),
  });

export const {
  useGetOrderPackagesQuery: useGetOrderPackages,
  useUpdateOrderPackagesMutation: useUpdateOrderPackages,
} = orderPackagesApi;
