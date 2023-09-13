import { type IOrder } from "@entities/orders";
import { rtkApi } from "@shared/api/rtkApi";

export const documentsOrderApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        createOrder: build.mutation<IOrder, IOrder>({
            query: (order) => ({
                url: 'documents/orders/create',
                method: 'POST',
                body: order
            })
        }),
        getOrderById: build.query<IOrder, string>({
            query: (id) => ({
                url: `documents/orders/${id}`,
                method: 'GET',
            }), 
            transformResponse: (response: IOrder[]) => response[0]
        }),
    })
});

export const {useCreateOrderMutation, useGetOrderByIdQuery} = documentsOrderApi;