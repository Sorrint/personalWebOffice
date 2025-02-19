export interface IOrderRecord {
  number: number;
  productName: string;
  product?: string;
  count: number;
  unit: string;
}

export type IOrderRecords = Record<number, IOrderRecord>;

export interface ICreateOrder {
  orderNumber: number;
  company: string;
  date: Date;
  comment?: string;
}

export interface IOrder extends ICreateOrder {
  _id: string;
  orderRecords: IOrderRecords;
  ordering?: string;
  distribution?: string;
}

export interface IOrderFillingErrors {
  numberDuplicates: { number: number; count: number }[];
  productsDuplicates: { productName: string; numbers: number[] }[];
  productsNotFound: number[];
}

export interface IOrderRecordsParams {
  orderNumber: number;
  excludeFilledProducts?: boolean;
}
