import { type CorrugatedSheets } from '../../consts/corrugatedSheetsConsts';
import { type Pallets } from '../../consts/palletsConsts';

export type ICountOfPallets = Record<typeof Pallets[keyof typeof Pallets], number>

export type ICorrugatedSheetsCount = Record<keyof typeof CorrugatedSheets, number>
export interface IOrderingRecord {
    number: number
    productName: string
    product?: string
    unit: string
    count: number
}

export interface IOrderingSummary {
    palletsCount: Partial<ICountOfPallets>
    corrugatedSheetsCount: Partial<ICorrugatedSheetsCount>
    slipSheetsCount?: number
    grossWeight: number
    shipmentDay?: Date
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

export interface IOrderingRecordDisplay extends Omit<IOrderingRecord, 'count' | 'number'> {
    count: number | string
    number: number | string
    rows: string
}
