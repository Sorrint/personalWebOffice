import { type IPackageCategoryResponse } from './../model/packageCategoryType';
import { rtkApi } from "@shared/api/rtkApi";
  
// const packagesAdapter = createEntityAdapter({selectId: (pack: IPackageCategoryResponse)=> pack._id});

// const initialState = packagesAdapter.getInitialState();

const packageCategoryApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPackageCategories: build.query<IPackageCategoryResponse[], void> ({
            query: () => ({
                url: '/package-categories'
            })
            // transformResponse: (response: IPackageCategoryResponse[]) => {
            //     return packagesAdapter.setAll(initialState, response);
            // }
        })
    })});

export const useGetPackageCategories = packageCategoryApi.useGetPackageCategoriesQuery;


// export const selectPackageCategoriesResult = packageCategoryApi.endpoints.getPackageCategories.select();

// const selectUnitsData = createSelector(
//     selectPackageCategoriesResult,
//     unitsResult => unitsResult.data
// );

// export const { selectAll: selectAllUnits, selectById: selectUnitById } =
//   packagesAdapter.getSelectors((state: RootState) => selectUnitsData(state) ?? initialState);