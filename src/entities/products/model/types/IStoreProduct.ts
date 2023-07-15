import type { IOrderProduct } from "@entities/orders/model/types/IOrder";

export interface extraData {
    collection: string
    volume: number
    weight: number
}
export interface IStoreProduct {
    _id: string
    name: string
    type: 'SCALABLE' | 'COUNTABLE'
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