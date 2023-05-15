import { IProduct, IProductCategory } from '../model/IProduct';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IProductListParams, ISearchParams, ISearchResult } from '../model/service';
import { productsDreamkasConfig } from './productsDreamkasConfig';
import { productsStoreConfig } from './productsStoreConfig';

const dataBase = localStorage.getItem('dataBase');
const productConfig = dataBase === 'dreamkasStorage' ? productsDreamkasConfig : productsStoreConfig;
const { reducerPath, baseQuery, endpoints } = productConfig;
const { loadProducts, loadProductBySearch } = endpoints;

export const productsAPI = createApi({
    reducerPath,
    baseQuery,
    endpoints: (build) => ({
        loadProducts: build.query<IProduct[], IProductListParams | void>(loadProducts),
        loadProductBySearch: build.query<IProduct[], ISearchParams>(
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
        })
    })
});
