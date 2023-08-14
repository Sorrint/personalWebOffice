import {useEffect} from 'react';
import { OrdersList, getOrders, loadOrdersList } from "@entities/orders";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks";


export const OrdersCatalog = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(getOrders);

    useEffect(()=> {
        dispatch(loadOrdersList());
    }, []);
    
    return <>{orders && <OrdersList orders={orders}/>}</>;
};