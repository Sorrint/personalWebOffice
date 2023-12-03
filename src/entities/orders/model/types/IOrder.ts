export interface IOrderRecord {
    number: number
    productName: string
    product?: string
    count: number
    unit: string
}

export interface IOrder {
    _id?: string
    orderName: string
    orderRecords: IOrderRecord[]
    ordering?: string
    distribution?: string
}

export interface OrderState {
    entities: IOrder[]
    currentOrder?: IOrder
    isLoading: boolean
    error: string | undefined
}
