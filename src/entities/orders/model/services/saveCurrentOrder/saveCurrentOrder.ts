import { createAsyncThunk } from '@reduxjs/toolkit';
import { type IOrder } from '../../types/IOrder';
import axios from 'axios';
import { type ThunkConfig } from '@app/providers/storeProvider';
import { orderActions } from '../../slices/OrderSlice';

interface SaveCurrentOrderProps {
    order: IOrder
}

export const saveCurrentOrder = createAsyncThunk<SaveCurrentOrderProps, IOrder, ThunkConfig<string>>('orders/saveOrder', async (order, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await axios.post(`${__SERVER_URI__}/documents/orders/create`, order);
        if (!response.data) {
            throw new Error();
        }

        dispatch(orderActions.setCurrentOrder(response.data));
        return response.data;
    } catch (error) {
        return rejectWithValue('error');
    }
});
