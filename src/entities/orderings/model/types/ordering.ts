import { type IOrderRecord } from "@entities/orders/model/types/IOrder";
import { type IStoreProduct } from "@entities/products/model/types/IStoreProduct";

export interface IOrderingProduct extends IOrderRecord, Omit<IStoreProduct, 'unit'> {}

export interface IOrderingContent {
    package: string
    countInRow?: number
    summary?: {
        countInRow?: number
        text?: string 
        sum?: number
        rows?: number
    }
    products: IOrderingProduct[]
}

export interface IOrdering {
    orderName: string,
    content: IOrderingContent[]
}