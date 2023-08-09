import { type IUnitOption, type IStoreProduct } from "@entities/products/model/types/IStoreProduct";

export interface IOrderProduct {
    orderNumber: number
    productName: string
    count: number
    unit: IUnitOption
}

export interface IOrder {
    _id?: string
    orderName: string
    products: IStoreProduct[]
}

export interface IOrderHeader {
    id: string
    text: string
    letter?: string
}

export interface OrderState {
    entities: IOrder[]
    currentOrder?: IOrder
    isLoading: boolean
    error: string | undefined
}

export type FileOrder = Record<string, string>;
