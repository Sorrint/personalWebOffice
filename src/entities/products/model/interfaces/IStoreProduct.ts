export interface extraData {
    collection: string
    volume: number
    weight: number
}
export interface IStoreProduct {
    _id: string
    name: string
    type: string
    quantity?: number
    department?: {
        id: number
        name: string
        tax: string
    }
    isMarked?: null | boolean
    price?: null | number
    stock?: null | IProductStock[]
    tax?: string
    unit?: string
    extraData?: extraData
}

export type IProductStock = [number, string, string, string, string];
