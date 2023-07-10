import { type IDreamkasProduct, type IProductCategory } from './interfaces/IDreamkasProduct';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { type IProductListParams, type ISearchParams, type ISearchResult } from '../model/service';
import { productsDreamkasConfig } from './productsDreamkasConfig';
import { type ICheckProduct, type IOrderProduct } from './interfaces/IOrderProduct';
import { productsStoreConfig } from './productsStoreConfig';

const dataBase = localStorage.getItem('dataBase');
const productConfig = dataBase === 'dreamkasStorage' ? productsDreamkasConfig : productsStoreConfig;
const { reducerPath, baseQuery, endpoints } = productConfig;
const { loadProducts } = endpoints;
export const productsAPI = createApi({
    reducerPath,
    baseQuery,
    endpoints: (build) => ({
        loadProducts: build.query<IDreamkasProduct[], IProductListParams | Record<string, unknown>>(loadProducts),
        loadProductBySearch: build.query<IDreamkasProduct[], ISearchParams>(
            productsDreamkasConfig.endpoints.loadProductBySearch
        ),
        loadCategoriesBySearch: build.query<IProductCategory[], ISearchParams>({
            query: (params) => ({
                url: `/search?q=${encodeURI(params.q)}&limit=${params.limit}`
            }),
            transformResponse: (response: ISearchResult) => {
                return response.categories;
            }
        }),
        loadProductsCategories: build.query<IProductCategory[], ISearchParams>({
            query: (params) => ({
                url: '/categories'
            }),
            transformResponse: (response: ISearchResult) => {
                return response.categories;
            }
        }),
        checkOrderProducts: build.mutation<ICheckProduct, IOrderProduct[]>(
            productsStoreConfig.endpoints.checkOrderProducts
        )
    })
});
