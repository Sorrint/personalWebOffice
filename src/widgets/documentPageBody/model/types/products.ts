import { type IStoreProduct } from "@entities/products";

export interface IStoreProductWithId extends IStoreProduct {
    _id: string
}