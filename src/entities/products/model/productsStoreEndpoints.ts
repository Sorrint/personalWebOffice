import { type ISearchParams, type ISearchResult } from './service';
import { type IStoreProduct } from './types/IStoreProduct';
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
        query: (orderProducts: IStoreProduct[]) => ({
            url: `${baseStoreUri}/checkOrderProducts`,
            method: 'POST',
            body: orderProducts, 
        }), 
    },
};
