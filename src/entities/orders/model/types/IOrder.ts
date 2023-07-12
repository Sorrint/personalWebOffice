export interface IOrderProduct {
    number: number
    productName: string
    count: number
    unit: string
}

export interface IOrder {
    orderName: string
    products: IOrderProduct[]
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
    error: string
}

export type FileOrder = Record<string, string>;