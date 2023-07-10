export enum productType {
    COUNTABLE = 'COUNTABLE',
    SCALABLE = 'SCALABLE',
    ALCOHOL = 'ALCOHOL',
    MILK = 'MILK'
}

export enum productTax {
    NDS_NO_TAX = 'NDS_NO_TAX',
    NDS_0 = 'NDS_0',
    NDS_10 = 'NDS_10',
    NDS_20 = 'NDS_20',
    NDS_10_CALCULATED = 'NDS_10_CALCULATED',
    NDS_20_CALCULATED = 'NDS_20_CALCULATED',
    NDS_MIXED = 'NDS_MIXED'
}

export interface departmentData {
    id: string
    name: string
    tax: productTax
}

export interface stock {
    _id: string
    remains: number
    date: Date
}

export interface extraData {
    collection: string
    volume: number
    weight: number
}

export interface createProductDto {
    name: string
    type: productType
    tax: productTax
    quantity?: number
    barcodes?: string[]
    price?: number
    department?: departmentData
    stock?: stock
    extra?: extraData
}
