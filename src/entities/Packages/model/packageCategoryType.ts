export interface PackageCategory {
  _id?: string;
  name: string;
}

export interface PackageCategoryResponse extends Omit<PackageCategory, '_id'> {
  _id: string;
}
