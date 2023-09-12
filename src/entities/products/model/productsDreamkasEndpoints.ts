import { type IProductListParams, type ISearchParams, type ISearchResult } from './service';

const baseDreamkasProductsUri = 'dreamkas/products';
export const productsDreamkasEndpoints = {
    loadProducts: {
        query: (params: IProductListParams) => 
            ({url: params.limit 
                ? `${baseDreamkasProductsUri}?limit=${params.limit}&offset=${params.offset ?? 0}` 
                : `${baseDreamkasProductsUri}/`})
    },
    loadProductBySearch: {
        query: (params: ISearchParams) => ({
            url: params.q ? `${baseDreamkasProductsUri}/search?q=${encodeURI(params.q)}&limit=${params.limit}` : baseDreamkasProductsUri
        }),
        transformResponse: (response: ISearchResult) => {
            return response.products;
        }
    }
};
