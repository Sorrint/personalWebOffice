import { type DreamkasProduct, type ProductCategory } from './types/DreamkasProduct';
import { type ProductListParams, type SearchParams, type SearchResult } from '../model/service';
import { rtkApi } from '@shared/api/rtkApi';
import { productsDreamkasEndpoints } from './productsDreamkasEndpoints';
import { productsStoreEndpoints } from './productsStoreEndpoints';
import { type CheckStoreProduct, type StoreProduct } from './types/StoreProduct';
import { loadAllProductsCached } from './queries/loadAllProductsCached';

const dataBase = localStorage.getItem('dataBase');
const productEndpoints =
  dataBase === 'dreamkasStorage' ? productsDreamkasEndpoints : productsStoreEndpoints;

const productsAPI = rtkApi.enhanceEndpoints({ addTagTypes: ['products'] }).injectEndpoints({
  endpoints: build => ({
    loadAllProductsCached: loadAllProductsCached(build.query),

    loadProducts: build.query<DreamkasProduct[], ProductListParams | Record<string, unknown>>({
      ...productEndpoints.loadProducts,
      providesTags: ['products'],
    }),

    loadProductBySearch: build.query<DreamkasProduct[], SearchParams>(
      productsDreamkasEndpoints.loadProductBySearch,
    ),

    loadCategoriesBySearch: build.query<ProductCategory[], SearchParams>({
      query: params => ({
        url: `/dreamkas/products/search?q=${encodeURI(params.q)}&limit=${params.limit}`,
      }),
      transformResponse: (response: SearchResult) => {
        return response.categories;
      },
    }),

    loadProductsCategories: build.query<ProductCategory[], SearchParams>({
      query: () => ({
        url: '/dreamkas/products/categories',
      }),
      transformResponse: (response: SearchResult) => {
        return response.categories;
      },
    }),

    checkOrderProducts: build.mutation<CheckStoreProduct, StoreProduct[]>(
      productsStoreEndpoints.checkOrderProducts,
    ),

    createProduct: build.mutation<StoreProduct, StoreProduct>({
      ...productsStoreEndpoints.createProduct,
      invalidatesTags: ['products'],
    }),
  }),
});

export const useLoadAllProductsCached = productsAPI.useLoadAllProductsCachedQuery;
export const useLoadProducts = productsAPI.useLoadProductsQuery;
export const useLoadProductsBySearch = productsAPI.useLoadProductBySearchQuery;
export const useLoadCategoriesBySearch = productsAPI.useLoadCategoriesBySearchQuery;
export const useLoadProductsCategories = productsAPI.useLoadProductsCategoriesQuery;
export const useCheckOrderProducts = productsAPI.useCheckOrderProductsMutation;
export const useCreateProduct = productsAPI.useCreateProductMutation;
