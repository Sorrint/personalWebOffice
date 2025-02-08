export interface IPackageCategory {
  _id?: string;
  name: string;
}

export interface IPackageCategoryResponse extends Omit<IPackageCategory, '_id'> {
  _id: string;
}
