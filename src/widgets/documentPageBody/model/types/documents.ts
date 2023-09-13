import { type IOrder } from "@entities/orders";
import { type IStoreProduct } from "@entities/products/model/types/IStoreProduct";

export interface IOrderResponse  extends IOrder{
    products: IStoreProduct[]
}