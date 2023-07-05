import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { SERVER_URI } from '@app/config/apiConfig';
import { IProductListParams, ISearchParams, ISearchResult } from './service';

export const productsDreamkasConfig = {
    reducerPath: 'ProductsDreamkasAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${SERVER_URI}/dreamkas/products`,
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${localStorage.getItem('dreamToken')} `);
            return headers;
        }
    }),
    endpoints: {
        loadProducts: {
            query: (params: IProductListParams) => ({
                url: params ? `?limit=${params.limit}&offset=${params.offset || 0}` : '/'
            })
        },
        loadProductBySearch: {
            query: (params: ISearchParams) => ({
                url: params.q ? `/search?q=${encodeURI(params.q)}&limit=${params.limit}` : ''
            }),
            transformResponse: (response: ISearchResult) => {
                return response.products;
            }
        }
    }
};
