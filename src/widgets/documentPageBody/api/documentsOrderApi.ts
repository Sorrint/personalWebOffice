import { normalizeData } from '@shared/lib/helpers';
import { type IOrder } from "@entities/orders";
import { rtkApi } from "@shared/api/rtkApi";
import { type INormalizedResponse, type IOrderResponse } from "../model/types/documents";

export const documentsOrderApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        createOrder: build.mutation<IOrder, IOrder>({
            query: (order) => ({
                url: 'documents/orders/create',
                method: 'POST',
                body: order
            })
        }),
        getOrderById: build.query<IOrderResponse, string>({
            query: (id) => ({
                url: `documents/orders/${id}`,
                method: 'GET',
            })
            // transformResponse: (response: IOrderResponse) => {
            //     const products = normalizeData(response.products);
            //     return {...response, products: products};
            // }
        }),
    })
});

export const { useGetOrderByIdQuery, useCreateOrderMutation } = documentsOrderApi;



