import { type EntityState, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { type IPackageCategoryResponse } from './../model/packageCategoryType';
import { rtkApi } from "@shared/api/rtkApi";
import { type RootState } from '@shared/lib/store/types';

const packageCategoriesAdapter = createEntityAdapter({selectId: (unit: IPackageCategoryResponse)=> unit._id});

const initialState = packageCategoriesAdapter.getInitialState();

const packageCategoryApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPackageCategories: build.query<EntityState<IPackageCategoryResponse>, void> ({
            query: () => ({
                url: '/package-categories'
            }),
            transformResponse: (response: IPackageCategoryResponse[]) => {
                return packageCategoriesAdapter.setAll(initialState, response);
            }
        })
    })});

export const useGetPackageCategories = packageCategoryApi.useGetPackageCategoriesQuery;

const selectPackageCategoiesResult = packageCategoryApi.endpoints.getPackageCategories.select();

const selectPackageCategoriesData = createSelector(
    selectPackageCategoiesResult,
    packageCategoriesResult => packageCategoriesResult.data
);

export const { 
    selectAll: selectAllPackageCategories, 
    selectById: selectPackageCategoriesById, 
    selectEntities: selectPackageCategoriesObject 
} = packageCategoriesAdapter.getSelectors((state: RootState) => selectPackageCategoriesData(state) ?? initialState);