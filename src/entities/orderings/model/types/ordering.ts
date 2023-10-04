import { type CorrugatedSheets } from "../../consts/corrugatedSheetsConsts";
import { type Pallets } from "../../consts/palletsConsts";

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

export interface IOrdering {
    records: IOrderingRecord[]
    summary: {
        countOfPackages: number,
        totalCount: number,
        categoryName: string
    }
}

export interface IOrderingRecordDisplay extends Omit<IOrderingRecord, 'count' | 'number'> {
    count: number | string
    number: number | string
    rows: string
}

// type SheetsRecord = Record<K extends keyof CorrugatedSheets, number> = {
//     [P in K]: number; // Mapped properties are not optional, and it's not a homomorphic mapped type so it can't come from anywhere else.
// };

