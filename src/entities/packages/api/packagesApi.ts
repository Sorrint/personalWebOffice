import { rtkApi } from "@shared/api/rtkApi";
import type { IPackage } from "../model/packagesTypes";

export interface IPackageWithId extends IPackage {
    _id: string
}

const packagesApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPackages: build.query<IPackageWithId[], void> ({
            query: () => ({
                url: '/packages'
            })
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
