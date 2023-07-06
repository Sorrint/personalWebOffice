import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { SERVER_URI } from '@app/config/apiConfig';
import { type ISearchParams, type ISearchResult } from '../model/service';
import { type IOrderProduct } from './interfaces/IOrderProduct';

export const productsStoreConfig = {
    reducerPath: 'ProductsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${SERVER_URI}/products`
    }),
    endpoints: {
        loadProducts: {
            query: () => ({ url: '/' })
        },
        loadProductBySearch: {
            query: (params: ISearchParams) => ({
                url: params.q ? `/search?q=${encodeURI(params.q)}&limit=${params.limit}` : ''
            }),
            transformResponse: (response: ISearchResult) => {
                return response.products;
            }
        },
        checkOrderProducts: {
            query: (orderProducts: IOrderProduct[]) => ({
                url: '/checkOrderProducts',
                method: 'POST',
                body: orderProducts
            })
        }
    }
};
