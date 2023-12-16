import { type IOrderingSummary } from './../types/ordering';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type IOrdering, type IOrderingChapter } from '../types/ordering';
import { type StoreSchema } from '@app/providers/storeProvider';

export const initSummary: IOrderingSummary = {
    corrugatedSheetsCount: {T21: 0, T99_2: 0},
    grossWeight: 0,
    palletsCount: {pallets: 0, pallets125: 0, pallets99: 0},
    shipmentDay: new Date().toString(),
    slipSheetsCount: 0
}

const initialState: IOrdering = {
    data: {},
    summary: initSummary,
    chaptersOrder: {}
};

export const orderingSlice = createSlice({
    name: 'orderingDetails',
    initialState,
    reducers: {
        setRecords: (state, action: PayloadAction<Record<string, IOrderingChapter>>) => {
            state.data = {...action.payload};
        },
        setSummary: (state, action: PayloadAction<IOrderingSummary>) => {
            state.summary = {...action.payload}
        },
        setChaptersOrder: (state, action: PayloadAction<Record<number, string>>) => {
            state.chaptersOrder = action.payload
        }
    },

},
);

export const { actions: orderingActions } = orderingSlice;
export const { reducer: orderingReducer } = orderingSlice;


export const getOrderingData = (state: StoreSchema) => state.ordering?.data;
export const getOrderingSummary = (state: StoreSchema) => state.ordering?.summary;
export const getChaptersOrder = (state: StoreSchema) => state.ordering?.chaptersOrder;

