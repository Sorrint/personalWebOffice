
export interface IPackageCategory {
    _id?: string;
    name: string;
    packages: string[];
    countOfPackages: number;
}

export interface IPackageCategoryResponse extends Omit<IPackageCategory, '_id'> {
    _id: string;
}