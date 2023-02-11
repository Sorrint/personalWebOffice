import { FileOrder } from './../IOrder';
import { createSlice } from '@reduxjs/toolkit';
import { read, utils } from 'xlsx';
import { AppDispatch } from '../../../../shared/lib/store/types';
import { IOrder } from '../IOrder';

interface OrderState {
    entities: IOrder[];
    isLoading: boolean;
    error: string;
}

const initialState: OrderState = {
    entities: [],
    isLoading: true,
    error: ''
};

export const OrderSlice = createSlice({
    name: 'order',
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
        }
    }
});

const { reducer: goodsReducer, actions } = OrderSlice;
const { orderRequested, orderRequestedSuccess, orderRequestedFail } = actions;

export const readOrder = (e: React.BaseSyntheticEvent) => async (dispatch: AppDispatch) => {
    dispatch(orderRequested());
    try {
        const file = e.target.files[0];
        const fileBuffer = await file.arrayBuffer();
        const wb = read(fileBuffer, { WTF: true });
        const dataBase = utils.sheet_to_json<FileOrder>(wb.Sheets[wb.SheetNames[0]], { header: 'A' });
        if (dataBase) {
            const headersRow = dataBase.find((item) => Object.values(item).find((value) => value === 'Продукция'));
            if (!headersRow) throw new Error('Не подходящий документ');
            // const headersWithLetters = headersRow && transformHeaders(headersRow);
            const goodsDB = dataBase.filter((item) => item !== headersRow);
            // const transformGoodsDB = goodsDB && transformGoods(goodsDB, headersWithLetters);
            // dispatch(goodsRequestedSuccess(transformGoodsDB));
        }
    } catch (error) {
        dispatch(orderRequestedFail(error));
    }
};
export default goodsReducer;
