import { type IPackageCategory } from './../model/packageCategoryType';
import { rtkApi } from "@shared/api/rtkApi";

export interface IPackageCategoryWithId extends IPackageCategory {
    _id: string
}
  
const packageCategoryApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPackageCategories: build.query<IPackageCategoryWithId[], void> ({
            query: () => ({
                url: '/package-categories'
            })
        })
    })});

export const useGetPackageCategories = packageCategoryApi.useGetPackageCategoriesQuery;
