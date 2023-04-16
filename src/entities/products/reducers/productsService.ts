import { IProduct, IProductCategory, IProductQueryTrace } from '../model/IProducts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

interface IParams {
    limit: number;
    q: string;
}

interface ISearchResult {
    categories: IProductCategory[];
    products: IProduct[];
    _queryTrace: IProductQueryTrace[];
}

export const productsAPI = createApi({
    reducerPath: 'ProductsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3000/dreamkass/products`,
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${localStorage.getItem('dreamToken')} `);
            return headers;
        }
    }),

    endpoints: (build) => ({
        loadProducts: build.query<IProduct[], number>({
            query: (limit) => ({ url: `/` })
        }),
        loadProductBySearch: build.query<IProduct[], IParams>({
            query: (params) => ({
                url: `/search?q=${encodeURI(params.q)}&limit=${params.limit}`
            }),
            transformResponse: (response: ISearchResult) => {
                return response.products;
            }
        }),
        loadCategoriesBySearch: build.query<IProductCategory[], IParams>({
            query: (params) => ({
                url: `/search?q=${encodeURI(params.q)}&limit=${params.limit}`
            }),
            transformResponse: (response: ISearchResult) => {
                return response.categories;
            }
        }),
        loadProductsCategories: build.query<IProductCategory[], IParams>({
            query: (params) => ({
                url: `/categories`
            }),
            transformResponse: (response: ISearchResult) => {
                return response.categories;
            }
        })
    })
});
