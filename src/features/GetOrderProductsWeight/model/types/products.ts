import { type IStoreProduct } from '@entities/Products';

export interface IStoreProductWithId extends IStoreProduct {
  _id: string;
}
