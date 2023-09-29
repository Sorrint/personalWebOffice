import { type OrderState } from '../types/IOrder';
import { createSlice } from '@reduxjs/toolkit';

const initialState: OrderState = {
    entities: [],
    isLoading: true,
    error: '',
    currentOrder: undefined
    // currentOrder: localStorage.getItem('dataBase') === 'localStorage' ? JSON.parse(localStorage.getItem('currentOrder')?? '')  : ''
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
    },
});

export const { reducer: orderReducer } = OrderSlice;
export const { actions: orderActions } = OrderSlice;
