import { rtkApi } from "@shared/api/rtkApi";
import { type IOrder } from "../model/types/IOrder";

const orderApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getOrdersList: build.query<IOrder[], void>({
            query: () => ({
                url: `documents/orders`,
                method: 'GET'
            })
        })
    } )
});

export const { useGetOrdersListQuery} = orderApi;