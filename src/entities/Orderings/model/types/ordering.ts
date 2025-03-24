import { type ReactNode } from 'react';

export interface OrderingRecord {
  number: number;
  productName: string;
  product?: string;
  unit: string;
  count: number;
}

export interface OrderingChapter {
  id: string;
  records: OrderingRecord[];
  countOfPackages?: number;
  productsCount: number;
  packageCategory?: string;
  rowsCount?: number;
  text?: string;
}

export interface OrderingRecordDisplay
  extends Omit<OrderingRecord, 'count' | 'number' | 'productName'> {
  count: number | string | (() => ReactNode);
  number: number | string | (() => ReactNode);
  rows: string | (() => ReactNode);
  productName: string | (() => ReactNode);
  editRows?: () => ReactNode;
}

export interface PackageSummaryInfo {
  name: string;
  count: number;
}
export interface OrderingSummary {
  pallets: PackageSummaryInfo[];
  rowSeparator: PackageSummaryInfo;
  corrugatedSheets?: PackageSummaryInfo[];
  grossWeight: number;
}
