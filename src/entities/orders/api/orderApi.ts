import { rtkApi } from '@shared/api/rtkApi';
import { type IOrder } from '../model/types/IOrder';

const orderApi = rtkApi.enhanceEndpoints({addTagTypes:['order']}).injectEndpoints({
    endpoints: (build) => ({
        getOrdersList: build.query<IOrder[], void>({
            query: () => ({
                url: 'documents/orders',
                method: 'GET'
            }),
            providesTags: ()=>['order']
        }),
        saveCurrentOrder: build.mutation<IOrder, IOrder>({
            query: () => ({
                url: 'documents/orders/create',
                method: 'POST',
            }),
            invalidatesTags: ['order']
        })
    })
});

export const { useGetOrdersListQuery, useSaveCurrentOrderMutation} = orderApi;