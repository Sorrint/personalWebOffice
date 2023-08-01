import { type IOrderProduct } from "@entities/orders/model/types/IOrder";



export type ProductType = 'SCALABLE' | 'COUNTABLE'
export interface extraData {
    package?: string
    weight: number
}


export interface IUnitOption {
    content: string
    _id: string
    type: ProductType
    base: number
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
    unit?: IUnitOption
    extraData?: extraData
}

export type IProductStock = [number, string, string, string, string];


export interface ICheckStoreProduct {
    productsExists: IStoreProduct[]
    productsNotExists: IOrderProduct[]
}