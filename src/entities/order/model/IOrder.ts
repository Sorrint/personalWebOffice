export interface IOrder {
    name?: string;
    value?: number;
    units?: string;
    category?: string;
}

export interface IOrderHeader {
    id: string;
    text: string;
    letter?: string;
}

export interface FileOrder {
    [letter: string]: string;
}
