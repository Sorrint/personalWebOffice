import { getOrders } from "@entities/orders";
import { loadOrdersList } from "@entities/orders/model/services/loadOrdersList/loadOrdersList";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks";
import {  useEffect } from 'react';
import { OrdersListItem } from "../ordersListItem/ordersListItem";


export const OrdersList = () => {
    
    const dispatch = useAppDispatch();
    const orders = useAppSelector(getOrders);

    useEffect(()=> {
        dispatch(loadOrdersList());
    }, []);

    return <>
        {orders 
            ? orders.map((order)=> <OrdersListItem key={order.orderName} order={order}/>) 
            : <div>Документов нет</div>
        }
    </>;
};

