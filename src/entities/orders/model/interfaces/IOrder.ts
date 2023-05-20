export interface IOrderProduct {
    number: number;
    productName: string;
    count: number;
    unit: string;
}

export interface IOrder {
    orderName: string;
    products: IOrderProduct[];
}

export interface IOrderHeader {
    id: string;
    text: string;
    letter?: string;
}

export interface FileOrder {
    [letter: string]: string;
}
