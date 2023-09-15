import { type IOrder } from "@entities/orders";
import { type IStoreProductWithId } from "./products";


export interface IOrderResponse  extends IOrder{
    products: IStoreProductWithId[]
}

export interface INormalizedResponse extends IOrder {
    products: Record<string,IStoreProductWithId>
}