import { type ReactNode } from 'react';

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

export interface IOrderingChapter {
  id: string;
  records: IOrderingRecord[];
  countOfPackages?: number;
  productsCount: number;
  packageCategory?: string;
  rowsCount?: number;
  text?: string;
}

export interface IOrderingRecordDisplay
  extends Omit<IOrderingRecord, 'count' | 'number' | 'productName'> {
  count: number | string | (() => ReactNode);
  number: number | string | (() => ReactNode);
  rows: string | (() => ReactNode);
  productName: string | (() => ReactNode);
}

export interface IPackageSummaryInfo {
  name: string;
  count: number;
}
export interface IOrderingSummary {
  pallets: IPackageSummaryInfo[];
  rowSeparator: IPackageSummaryInfo;
  corrugatedSheets?: IPackageSummaryInfo[];
  grossWeight: number;
}
