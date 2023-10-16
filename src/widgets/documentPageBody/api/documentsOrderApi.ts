import { type IOrderRecord } from '@entities/orders';
import { type IOrder } from '@entities/orders';
import { type IOrderResponse } from '@features/getOrderProductsWeight';
import { rtkApi } from '@shared/api/rtkApi';

export const documentsOrderApi = rtkApi.enhanceEndpoints({addTagTypes: ['order']}).injectEndpoints({
    endpoints: (build) => ({
        createOrder: build.mutation<IOrder, IOrder>({
            query: (order) => ({
                url: 'documents/orders/create',
                method: 'POST',
                body: order
            }),
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

export const { useCreateOrderMutation, useUpdateOrderRecordMutation } = documentsOrderApi;



