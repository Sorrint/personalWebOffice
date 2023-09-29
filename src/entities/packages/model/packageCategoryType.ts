import { type IPackageResponse } from "./packagesTypes";

export interface IPackageCategory {
    _id?: string;
    name: string;
    package: string;
    countOfPackages: number;
}

export interface IPackageCategoryResponse extends Omit<IPackageCategory, 'package' | 'countOfPackages'> {
    _id: string;
    name: string;
    package: IPackageResponse;
    countOfPackages: number;
}