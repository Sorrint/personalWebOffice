export interface IOrderProduct {
    productName: string;
    number: number;
    unit: string;
    count: number;
}

export interface IDbHeaders {
    id: string;
    text: string;
    letter?: string;
}

export interface FileDB {
    [letter: string]: string;
}
