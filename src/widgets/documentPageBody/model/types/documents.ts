import { type IStoreProduct } from '@entities/products';
import { type IOrderRecord, type IOrder } from "@entities/orders";
import { type IStoreProductWithId } from "./products";
import { type IUnit } from "@entities/units";



export interface IOrderRecordResponse extends Omit<IOrderRecord, 'unit' | 'product'> {
    product: IStoreProduct,
    unit?: IUnit
}
export interface IOrderResponse  extends Omit<IOrder,  'orderRecords'>{
    orderRecords: IOrderRecordResponse[]
}

export interface INormalizedResponse extends IOrder {
    products: Record<string,IStoreProductWithId>
}