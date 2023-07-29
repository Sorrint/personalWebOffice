import { rtkApi } from "@shared/api/rtkApi";
import type { IPackage } from "../model/packageTypes";

export const packagesApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPackages: build.query<IPackage[], null> ({
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