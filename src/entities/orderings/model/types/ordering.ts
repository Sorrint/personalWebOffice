import { type IOrderProduct } from "@entities/orders/model/types/IOrder";
import { type IStoreProduct } from "@entities/products/model/types/IStoreProduct";

export interface IOrderingProduct extends IOrderProduct, Omit<IStoreProduct, 'unit'> {}

export interface IOrderingContent {
    package: string
    countInRow?: number
    summary?: {
        text?: string 
        sum?: number
        rows?: string
    }
    products: IOrderingProduct[]
}

export interface IOrdering {
    orderName: string,
    content: IOrderingContent[]
}