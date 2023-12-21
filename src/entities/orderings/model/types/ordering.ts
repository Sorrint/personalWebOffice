import { type CorrugatedSheets } from '../../consts/corrugatedSheetsConsts';
import { type Pallets } from '../../consts/palletsConsts';

export type ICountOfPallets = Record<Pallets, number>

export type ICorrugatedSheetsCount = Record<keyof typeof CorrugatedSheets, number>
export interface IOrderingRecord {
    number: number
    productName: string
    product?: string
    unit: string
    count: number
}

export interface IOrderingWeights {
    packagesWeight: number
    productsWeight: number
    slipSheetsWeight: number
    palletsWeight: number
    corrugatedSheetsWeight: number
}

export interface IOrderingSummaryData {
    rowsCount: number
    palletsCount: ICountOfPallets
    corrugatedSheetsCount: Partial<ICorrugatedSheetsCount>
    slipSheetsCount: number
    weights: IOrderingWeights
    shipmentDay?: string
}

export interface IOrderingChapter {
    records: IOrderingRecord[]
    summary: {
        countOfPackages: number,
        totalCount: number,
        categoryName: string,
        text: string,
        rowsCount: number
    }
}

export interface IOrdering {
    summaryData: IOrderingSummaryData
    chaptersData: Record<string, IOrderingChapter>
}

export interface IOrderingRecordDisplay extends Omit<IOrderingRecord, 'count' | 'number'> {
    count: number | string
    number: number | string
    rows: string
}


export interface IOrderingDataForXLSX {
    '№'?: number | string
    'Наименование'?: string
    'Кол-во'?: number   
    'Ед.'?: string
    'Ряды'?: string
}