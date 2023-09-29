import { type IPackageCategoryResponse } from './../model/packageCategoryType';
import { rtkApi } from "@shared/api/rtkApi";
  
const packageCategoryApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPackageCategories: build.query<IPackageCategoryResponse[], void> ({
            query: () => ({
                url: '/package-categories'
            })
        })
    })});

export const useGetPackageCategories = packageCategoryApi.useGetPackageCategoriesQuery;