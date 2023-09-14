import { type IOrder } from "@entities/orders";
import { rtkApi } from "@shared/api/rtkApi";
import { type IOrderResponse } from "../model/types/documents";

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
            }), 
            transformResponse: (response: IOrderResponse[]) => response[0]
        }),
    })
});

export const {useCreateOrderMutation, useGetOrderByIdQuery} = documentsOrderApi;