import { type ProductListParams, type SearchParams, type SearchResult } from './service';

export const baseDreamkasProductsUri = 'dreamkas/products';
export const productsDreamkasEndpoints = {
  loadProducts: {
    query: (params: ProductListParams) => ({
      url: params.limit
        ? `${baseDreamkasProductsUri}?limit=${params.limit}&offset=${params.offset ?? 0}`
        : `${baseDreamkasProductsUri}/`,
    }),
  },
  loadProductBySearch: {
    query: (params: SearchParams) => ({
      url: params.q
        ? `${baseDreamkasProductsUri}/search?q=${encodeURI(params.q)}&limit=${params.limit}`
        : baseDreamkasProductsUri,
    }),
    transformResponse: (response: SearchResult) => {
      return response.products;
    },
    keepUnusedDataFor: 5,
  },
};
