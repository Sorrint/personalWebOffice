export interface OrderRecord {
  number: number;
  productName: string;
  product?: string;
  count: number;
  unit: string;
}

export type OrderRecords = Record<number, OrderRecord>;

export interface CreateOrder {
  orderNumber: number;
  company: string;
  date: Date;
  comment?: string;
}

export interface Order extends CreateOrder {
  _id: string;
  orderRecords: OrderRecords;
  ordering?: string;
  distribution?: string;
}

export interface OrderFillingErrors {
  numberDuplicates: { number: number; count: number }[];
  productsDuplicates: { productName: string; numbers: number[] }[];
  productsNotFound: number[];
}

export interface OrderRecordsParams {
  orderNumber: number;
  excludeFilledProducts?: boolean;
}
