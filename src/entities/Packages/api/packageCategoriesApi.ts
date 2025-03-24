import { type EntityState, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import { rtkApi } from '@shared/api/rtkApi';
import { type RootState } from '@shared/lib/store/types';

import { type PackageCategoryResponse } from './../model/packageCategoryType';

const packageCategoriesAdapter = createEntityAdapter({
  selectId: (unit: PackageCategoryResponse) => unit._id,
});

const initialState = packageCategoriesAdapter.getInitialState();

const packageCategoryApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getPackageCategories: build.query<EntityState<PackageCategoryResponse, string>, void>({
      query: () => ({
        url: '/package-categories',
      }),
      transformResponse: (response: PackageCategoryResponse[]) => {
        return packageCategoriesAdapter.setAll(initialState, response);
      },
    }),
  }),
});

export const useGetPackageCategories = packageCategoryApi.useGetPackageCategoriesQuery;

const selectPackageCategoiesResult = packageCategoryApi.endpoints.getPackageCategories.select();

const selectPackageCategoriesData = createSelector(
  selectPackageCategoiesResult,
  packageCategoriesResult => packageCategoriesResult.data,
);

export const {
  selectAll: selectAllPackageCategories,
  selectById: selectPackageCategoriesById,
  selectEntities: selectPackageCategoriesObject,
} = packageCategoriesAdapter.getSelectors(
  (state: RootState) => selectPackageCategoriesData(state) ?? initialState,
);
