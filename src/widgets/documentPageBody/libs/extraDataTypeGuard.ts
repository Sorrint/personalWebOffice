import { type IOrderingProduct } from '@entities/products/model/interfaces/IOrderProduct';
import { type extraData } from '@entities/products/model/interfaces/IStoreProduct';

export interface IOrderingProductWithExtraData extends IOrderingProduct {
    extraData: extraData
}

export function hasExtraData (product: IOrderingProduct): product is IOrderingProductWithExtraData {
    return (
        product.extraData !== undefined &&
        product.extraData !== null &&
        typeof product.extraData?.collection === 'string' &&
        typeof product.extraData?.volume === 'number' &&
        typeof product.extraData?.weight === 'number'
    );
}

export function getProductType (product: IOrderingProduct): IOrderingProduct | IOrderingProductWithExtraData {
    if (hasExtraData(product)) {
        return product;
    } else {
        return product;
    }
}
