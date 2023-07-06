import { type IStoreProduct } from './IStoreProduct';

export interface IOrderProduct {
    productName: string
    number: number
    unit: string
    count: number
}

export interface IDbHeaders {
    id: string
    text: string
    letter?: string
}

export type FileDB = Record<string, string>;

export interface ICheckProduct {
    productsExists: IOrderingProduct[]
    productsNotExists: IOrderProduct[]
}

export interface IOrderingProduct extends IStoreProduct {
    unit: string
    count: number
    orderNumber: number
}
