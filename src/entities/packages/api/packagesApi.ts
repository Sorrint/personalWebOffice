import { rtkApi } from '@shared/api/rtkApi';
import type { IPackage } from '../model/packagesTypes';
import { type EntityState, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { type RootState } from '@shared/lib/store/types';

export interface IPackageWithId extends IPackage {
    _id: string
}

const packagesAdapter = createEntityAdapter({selectId: (unit: IPackageWithId)=> unit._id});

const initialState = packagesAdapter.getInitialState();


const packagesApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPackages: build.query<EntityState<IPackageWithId>, void> ({
            query: () => ({
                url: '/packages'
            }),
            transformResponse: (response: IPackageWithId[]) => {
                return packagesAdapter.setAll(initialState, response);
            }
        }),
        createPackage: build.mutation<IPackage, IPackage> ({
            query: (tare) => ({
                url: '/packages/create',
                method: 'POST',
                body: tare
            })
        })
    })
});

export const useCreateNewPackage = packagesApi.useCreatePackageMutation;
export const useGetPackages = packagesApi.useGetPackagesQuery;


const selectPackagesResult = packagesApi.endpoints.getPackages.select();

const selectPackagesData = createSelector(
    selectPackagesResult,
    packagesResult => packagesResult.data
);

export const { 
    selectAll: selectAllPackages, 
    selectById: selectPackageById, 
    selectEntities: selectPackagesObject 
} =
  packagesAdapter.getSelectors((state: RootState) => selectPackagesData(state) ?? initialState);