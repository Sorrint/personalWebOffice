import { type StoreProduct } from '@entities/Products';

export interface StoreProductWithId extends StoreProduct {
  _id: string;
}
