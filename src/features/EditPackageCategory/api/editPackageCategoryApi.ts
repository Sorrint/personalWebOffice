import { type IPackageCategory } from '@entities/Packages';
import { rtkApi } from '@shared/api/rtkApi';

const editPackageCategoryApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    createPackageCategory: build.mutation<IPackageCategory, IPackageCategory>({
      query: tare => ({
        url: '/package-categories/create',
        method: 'POST',
        body: tare,
      }),
    }),
  }),
});

export const useCreatePackageCategory = editPackageCategoryApi.useCreatePackageCategoryMutation;
