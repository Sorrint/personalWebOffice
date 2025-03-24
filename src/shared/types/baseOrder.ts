export interface BaseOrder {
  _id: string;
  orderNumber: number;
  date: Date;
  company: string;
  comment?: string;
  customer?: string;
}
