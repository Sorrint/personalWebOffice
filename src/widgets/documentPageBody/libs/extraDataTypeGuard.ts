import { type extraData, type IStoreProduct } from '@entities/products/model/types/IStoreProduct';

export interface IStoreProductWithExtraData extends IStoreProduct {
    extraData: extraData
}

export function hasExtraData (product: IStoreProduct): product is IStoreProductWithExtraData {
    return (
        product.extraData !== undefined &&
        product.extraData !== null &&
        typeof product.extraData?.collection === 'string' &&
        typeof product.extraData?.volume === 'number' &&
        typeof product.extraData?.weight === 'number'
    );
}

export function getProductType (product: IStoreProduct): IStoreProduct | IStoreProductWithExtraData {
    if (hasExtraData(product)) {
        return product;
    } else {
        return product;
    }
}
