import { type IOrder } from './interfaces/IOrder';
import { createSlice } from '@reduxjs/toolkit';

import { type PersistState } from '@shared/lib/store/types';

interface OrderState {
    entities: IOrder[]
    currentOrder?: IOrder
    isLoading: boolean
    error: string
}

const initialState: OrderState = {
    entities: [],
    isLoading: true,
    error: ''
};

export const OrderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        orderRequested: (state) => {
            state.isLoading = true;
        },
        orderRequestedSuccess: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.entities = action.payload;
        },
        orderRequestedFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        addOrder: (state, action) => {
            state.entities.push({
                ...action.payload
            });
        },
        setCurrentOrder: (state, action) => {
            state.currentOrder = action.payload;
        }
    }
});

const { reducer: ordersReducer, actions } = OrderSlice;
export const { orderRequested, orderRequestedSuccess, orderRequestedFail, addOrder, setCurrentOrder } = actions;

export const getOrders = () => (state: PersistState) => state.orders.entities;
export const getCurrentOrder = () => (state: PersistState) => state.orders.currentOrder;

export default ordersReducer;
