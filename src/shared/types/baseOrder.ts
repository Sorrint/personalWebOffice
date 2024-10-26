export interface IBaseOrder {
  _id: string;
  orderNumber: number;
  date: Date;
  company: string;
  comment?: string;
  customer?: string;
}
