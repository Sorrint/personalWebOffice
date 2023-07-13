import { type ISearchParams, type ISearchResult } from './service';
import { type IOrderProduct } from './interfaces/IOrderProduct';
const baseStoreUri = 'products';

export const productsStoreEndpoints = {
    loadProducts: {
        query: () => ({ url: `${baseStoreUri}/` })
    },
    loadProductBySearch: {
        query: (params: ISearchParams) => ({
            url: params.q ? `${baseStoreUri}/search?q=${encodeURI(params.q)}&limit=${params.limit}` : baseStoreUri
        }),
        transformResponse: (response: ISearchResult) => {
            return response.products;
        }
    },
    checkOrderProducts: {
        query: (orderProducts: IOrderProduct[]) => ({
            url: `${baseStoreUri}/checkOrderProducts`,
            method: 'POST',
            body: orderProducts
        })
    }
};
