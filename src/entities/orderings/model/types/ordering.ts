export interface IOrderingProduct {
    unit: string
    count: number
    orderNumber: number
}

export interface IOrdering {
    orderName: string,
    products: IOrderingProduct[]
}