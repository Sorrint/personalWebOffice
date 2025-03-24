import { rtkApi } from '@shared/api/rtkApi';
import { type Package } from '../model/packagesTypes';
// import { type EntityState, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
// import { type RootState } from '@shared/lib/store/types';
import { transformPackagesList } from '../lib/helpers/transformPackagesList';
import { AppLinkItem } from '@shared/ui/AppLinksList';

// const packagesAdapter = createEntityAdapter({ selectId: (unit: IPackageWithId) => unit._id });

// const initialState = packagesAdapter.getInitialState();

const packagesApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getPackages: build.query<AppLinkItem[], void>({
      query: () => ({
        url: '/packages',
      }),
      transformResponse: transformPackagesList,
    }),

    createPackage: build.mutation<Package, Package>({
      query: tare => ({
        url: '/packages/create',
        method: 'POST',
        body: tare,
      }),
    }),
  }),
});

export const useCreateNewPackage = packagesApi.useCreatePackageMutation;
export const useGetPackages = packagesApi.useGetPackagesQuery;

// const selectPackagesResult = packagesApi.endpoints.getPackages.select();

// const selectPackagesData = createSelector(
//   selectPackagesResult,
//   packagesResult => packagesResult.data,
// );

// export const {
//   selectAll: selectAllPackages,
//   selectById: selectPackageById,
//   selectEntities: selectPackagesObject,
// } = packagesAdapter.getSelectors((state: RootState) => selectPackagesData(state) ?? initialState);
