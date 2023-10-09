export interface IPackage {
    _id?: string
    category?: string
    volume?: number
    weight?: number
    name: string
    color?: string
}

export interface IPackageResponse extends Omit<IPackage, '_id'> {
    _id: string
}