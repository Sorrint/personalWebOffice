import { type ReactNode } from 'react';
import { type CorrugatedSheets } from '../../consts/corrugatedSheetsConsts';
import { type Pallets } from '../../consts/palletsConsts';
import { IBaseOrder } from '@shared/types/baseOrder';

export type ICountOfPallets = Record<Pallets, number>;

export type ICorrugatedSheetsCount = Record<keyof typeof CorrugatedSheets, number>;
export interface IOrderingRecord {
  number: number;
  productName: string;
  product?: string;
  unit: string;
  count: number;
}

export interface IOrderingWeights {
  packagesWeight: number;
  productsWeight: number;
  slipSheetsWeight: number;
  palletsWeight: number;
  corrugatedSheetsWeight: number;
}

export interface IOrderingSummaryData {
  rowsCount: number;
  palletsCount: ICountOfPallets;
  corrugatedSheetsCount: Partial<ICorrugatedSheetsCount>;
  slipSheetsCount: number;
  weights: IOrderingWeights;
  shipmentDay?: string;
}

export interface IOrderingChapter {
  records: IOrderingRecord[];
  summary: {
    countOfPackages: number;
    totalCount: number;
    categoryName: string;
    text: string;
    rowsCount: number;
  };
}

export interface IOrdering {
  summaryData: IOrderingSummaryData;
  chaptersData: Record<string, IOrderingChapter>;
}

export interface IOrderingRecordDisplay
  extends Omit<IOrderingRecord, 'count' | 'number' | 'productName'> {
  count: number | string | (() => ReactNode);
  number: number | string | (() => ReactNode);
  rows: string | (() => ReactNode);
  productName: string | (() => ReactNode);
}

export interface IOrdering extends IBaseOrder {}
