import { type SearchParams, type SearchResult } from './service';
import { type StoreProduct } from './types/StoreProduct';
const baseStoreUri = 'products';

export const productsStoreEndpoints = {
  loadProducts: {
    query: () => ({ url: `${baseStoreUri}/` }),
  },
  loadProductBySearch: {
    query: (params: SearchParams) => ({
      url: params.q
        ? `${baseStoreUri}/search?q=${encodeURI(params.q)}&limit=${params.limit}`
        : baseStoreUri,
    }),
    transformResponse: (response: SearchResult) => {
      return response.products;
    },
  },
  checkOrderProducts: {
    query: (orderProducts: StoreProduct[]) => ({
      url: `${baseStoreUri}/checkOrderProducts`,
      method: 'POST',
      body: orderProducts,
    }),
  },
  createProduct: {
    query: (product: StoreProduct) => ({
      url: `${baseStoreUri}/createProduct`,
      method: 'POST',
      body: product,
    }),
  },
};
