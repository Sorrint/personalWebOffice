// import { IInventoryProduct } from './IInventoryProduct';
export interface IInventoryProduct {
    name: string;
    price: number;
    quantity: number;
}

export interface IInventoryDocs {
    _id?: string;
    documentNumber: number;
    storeName: string;
    choosenDate: Date;
    сomment: string;
    products: IInventoryProduct[];
}

export interface IdataForXLSX {
    '№ п/п'?: number;
    Наименование: string;
    Количество?: number;
    Цена?: number;
    Сумма: number;
}
