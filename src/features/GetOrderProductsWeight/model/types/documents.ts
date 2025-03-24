import { type StoreProduct } from '@entities/Products';
import { type OrderRecord, type Order } from '@entities/Orders';
import { type Unit } from '@entities/Units';

export interface OrderRecordResponse extends Omit<OrderRecord, 'unit' | 'product'> {
  product: StoreProduct;
  unit?: Unit;
}
export interface OrderResponse extends Omit<Order, 'orderRecords'> {
  orderRecords: OrderRecordResponse[];
}
