import type { IOrderProduct } from "@entities/orders/model/types/IOrder";
import type { ICollection } from "@entities/products/components/productCollectionList/productCollectionList";

export type ProductType = 'SCALABLE' | 'COUNTABLE'
export interface extraData {
    collection: ICollection
    volume: number
    weight: number
}
export interface IStoreProduct {
    _id?: string
    name: string
    type: ProductType
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


export interface ICheckStoreProduct {
    productsExists: IStoreProduct[]
    productsNotExists: IOrderProduct[]
}