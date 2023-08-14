import { OrdersListItem } from "../ordersListItem/ordersListItem";
import { type IOrder } from "@entities/orders/model/types/IOrder";

interface OrderListProps {
    orders: IOrder[]
}

export const OrdersList = ({orders}: OrderListProps) => {
    
    return <>
        {orders 
            ? orders.map((order)=> <OrdersListItem key={order.orderName} order={order}/>) 
            : <div>Документов нет</div>
        }
    </>;
};

