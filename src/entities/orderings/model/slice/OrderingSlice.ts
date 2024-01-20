import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type StoreSchema } from '@app/providers/storeProvider';

import {
  type IOrderingSummaryData,
  type IOrderingChapter,
  type IOrdering,
  type ICountOfPallets,
  type IOrderingWeights,
  type ICorrugatedSheetsCount,
} from './../types/ordering';
import { type Pallets, PalletsWeight, CorrugatedSheetsWeight } from '../../consts/palletsConsts';
import { getRowsCount, getSlipSheetsCount, getSlipSheetsWeight } from '../../lib/helpers';

export const initSummary: IOrderingSummaryData = {
  corrugatedSheetsCount: { T21: 0, T99_2: 0 },
  weights: {
    packagesWeight: 0,
    productsWeight: 0,
    slipSheetsWeight: 0,
    palletsWeight: 0,
    corrugatedSheetsWeight: 0,
  },
  palletsCount: { pallets: 0, pallets125: 0, pallets99: 0 },
  shipmentDay: '',
  slipSheetsCount: 0,
  rowsCount: 0,
};

export interface IOrderingSlice extends IOrdering {
  isLoading: boolean;
  categoriesOrder: Record<number, string>;
}

const initialState: IOrderingSlice = {
  chaptersData: {},
  summaryData: initSummary,
  categoriesOrder: {},
  isLoading: false,
};

export const orderingSlice = createSlice({
  name: 'orderingDetails',
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<Record<string, IOrderingChapter>>) => {
      const chapters = action.payload;
      const rowsCount = getRowsCount(chapters);
      state.summaryData.rowsCount = rowsCount;
      state.chaptersData = chapters;
      const slipSheetsCount = getSlipSheetsCount(rowsCount);
      state.summaryData.slipSheetsCount = slipSheetsCount;
      state.summaryData.weights.slipSheetsWeight = getSlipSheetsWeight(slipSheetsCount);
    },
    setPalletsCount: (state, action: PayloadAction<ICountOfPallets>) => {
      const palletsCount = action.payload;
      state.summaryData.palletsCount = { ...palletsCount };
      state.summaryData.weights.palletsWeight = Object.keys(palletsCount).reduce(
        (result, key) => (result += palletsCount[key as Pallets] * PalletsWeight[key as Pallets]),
        0,
      );
      const corrugatedSheetsCount = {
        T21: palletsCount.pallets125 * 1.5,
        T99_2: palletsCount.pallets99 * 2,
      };
      state.summaryData.corrugatedSheetsCount = corrugatedSheetsCount;
      state.summaryData.weights.corrugatedSheetsWeight = Object.keys(CorrugatedSheetsWeight).reduce(
        (acc, key) =>
          (acc +=
            corrugatedSheetsCount[key as keyof ICorrugatedSheetsCount] *
            CorrugatedSheetsWeight[key as keyof ICorrugatedSheetsCount]),
        0,
      );
    },
    setSummary: (state, action: PayloadAction<IOrderingSummaryData>) => {
      state.summaryData = { ...action.payload };
    },
    setChaptersOrder: (state, action: PayloadAction<Record<number, string>>) => {
      const categoriesOrder = action.payload;
      state.categoriesOrder = categoriesOrder;
      state.chaptersData = Object.values(categoriesOrder).reduce(
        (acc: Record<string, IOrderingChapter>, key) => {
          const record = state.chaptersData[key];
          if (record) {
            acc[key] = record;
          }
          return acc;
        },
        {},
      );
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setWeights: (state, action: PayloadAction<Partial<IOrderingWeights>>) => {
      const mergedWeights = Object.entries(action.payload).reduce(
        (result, [key, value]) => {
          if (value !== undefined) {
            result[key as keyof IOrderingWeights] = value;
          }
          return result;
        },
        { ...state.summaryData.weights },
      );
      state.summaryData.weights = mergedWeights;
    },
    setChapterSummary: (
      state,
      action: PayloadAction<Record<string, Partial<IOrderingChapter['summary']>>>,
    ) => {
      Object.keys(action.payload).map((key) => {
        state.chaptersData[key].summary = {
          ...state.chaptersData[key].summary,
          ...action.payload[key],
        };
        const rowsCount = getRowsCount(state.chaptersData);
        state.summaryData.rowsCount = rowsCount;
        const slipSheetsCount = getSlipSheetsCount(rowsCount);
        state.summaryData.slipSheetsCount = slipSheetsCount;
        state.summaryData.weights.slipSheetsWeight = getSlipSheetsWeight(slipSheetsCount);
      });
    },
  },
});

export const { actions: orderingActions } = orderingSlice;
export const { reducer: orderingReducer } = orderingSlice;

export const getOrderingData = (state: StoreSchema) => state.ordering?.chaptersData;
export const getOrderingSummary = (state: StoreSchema) => state.ordering?.summaryData;
export const getChaptersOrder = (state: StoreSchema) => state.ordering?.categoriesOrder;
export const getIsLoading = (state: StoreSchema) => state.ordering?.isLoading;
