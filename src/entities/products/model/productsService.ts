import { IDreamkasProduct, IProductCategory } from './interfaces/IDreamkasProduct';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IProductListParams, ISearchParams, ISearchResult } from '../model/service';
import { productsDreamkasConfig } from './productsDreamkasConfig';
import { IOrderProduct } from './interfaces/IOrderProduct';
import { productsStoreConfig } from './productsStoreConfig';

const dataBase = localStorage.getItem('dataBase');
const productConfig = dataBase === 'dreamkasStorage' ? productsDreamkasConfig : productsStoreConfig;
const { reducerPath, baseQuery, endpoints } = productConfig;
const { loadProducts } = endpoints;
console.log(baseQuery);
export const productsAPI = createApi({
    reducerPath,
    baseQuery,
    endpoints: (build) => ({
        loadProducts: build.query<IDreamkasProduct[], IProductListParams | void>(loadProducts),
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
                url: `/categories`
            }),
            transformResponse: (response: ISearchResult) => {
                return response.categories;
            }
        }),
        checkOrderProducts: build.mutation<IOrderProduct[], IOrderProduct[]>(
            productsStoreConfig.endpoints.checkOrderProducts
        )
    })
});
