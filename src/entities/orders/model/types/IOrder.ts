export interface IOrderRecord {
    orderNumber: number
    productName: string
    productId?: string
    count: number
    unitId?: string
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
