import { type IDreamkasProduct, type IProductCategory } from './interfaces/IDreamkasProduct';
import { type IProductListParams, type ISearchParams, type ISearchResult } from '../model/service';
import { type ICheckProduct, type IOrderProduct } from './interfaces/IOrderProduct';
import { rtkApi } from '@shared/api/rtkApi';
import { productsDreamkasEndpoints } from './productsDreamkasEndpoints';
import { productsStoreEndpoints } from './productsStoreEndpoints';

const dataBase = localStorage.getItem('dataBase');
const productEndpoints = dataBase === 'dreamkasStorage' ? productsDreamkasEndpoints : productsStoreEndpoints;

const productsAPI = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        loadProducts: build.query<IDreamkasProduct[], IProductListParams | Record<string, unknown>>(productEndpoints.loadProducts),
        loadProductBySearch: build.query<IDreamkasProduct[], ISearchParams>(
            productsDreamkasEndpoints.loadProductBySearch
        ),
        loadCategoriesBySearch: build.query<IProductCategory[], ISearchParams>({
            query: (params) => ({
                url: `/dreamkas/products/search?q=${encodeURI(params.q)}&limit=${params.limit}`
            }),
            transformResponse: (response: ISearchResult) => {
                return response.categories;
            }
        }),
        loadProductsCategories: build.query<IProductCategory[], ISearchParams>({
            query: (params) => ({
                url: '/dreamkas/products/categories'
            }),
            transformResponse: (response: ISearchResult) => {
                return response.categories;
            }
        }),
        checkOrderProducts: build.mutation<ICheckProduct, IOrderProduct[]>(
            productsStoreEndpoints.checkOrderProducts
        )
    })
});

export const useLoadProducts = productsAPI.useLoadProductsQuery;
export const useLoadProductsBySearch = productsAPI.useLoadProductBySearchQuery;
export const useLoadCategoriesBySearch = productsAPI.useLoadCategoriesBySearchQuery;
export const useLoadProductsCategories = productsAPI.useLoadProductsCategoriesQuery;
export const useCheckOrderProducts = productsAPI.useCheckOrderProductsMutation;
