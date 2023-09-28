import { type IOrderRecord } from '@entities/orders';
import { type IOrder } from "@entities/orders";
import { rtkApi } from "@shared/api/rtkApi";
import { type IOrderResponse } from "../model/types/documents";

export const documentsOrderApi = rtkApi.enhanceEndpoints({addTagTypes: ['order']}).injectEndpoints({
    endpoints: (build) => ({
        createOrder: build.mutation<IOrder, IOrder>({
            query: (order) => ({
                url: 'documents/orders/create',
                method: 'POST',
                body: order
            }),
        }),
        getOrderById: build.query<IOrderResponse, string>({
            query: (id) => ({
                url: `documents/orders/${id}`,
                method: 'GET',
            }),
            providesTags: ()=>['order']

            // transformResponse: (response: IOrderResponse) => {
            //     const products = normalizeData(response.products);
            //     return {...response, products: products};
            // }
        }),
        updateOrderRecord: build.mutation<IOrderResponse, {record: Partial<IOrderRecord>, id: string}>({
            query: ({record, id}) => ({
                url: `documents/orders/${id}`,
                method: 'PATCH',
                body: record
            }),
            invalidatesTags: ['order']
        })
    })
});

export const { useGetOrderByIdQuery, useCreateOrderMutation, useUpdateOrderRecordMutation } = documentsOrderApi;



