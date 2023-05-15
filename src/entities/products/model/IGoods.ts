export interface IGoods {
    name?: string;
    value?: number;
    units?: string;
    category?: string;
}

export interface IDbHeaders {
    id: string;
    text: string;
    letter?: string;
}

export interface FileDB {
    [letter: string]: string;
}
