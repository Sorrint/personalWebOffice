export interface IOrderingRecord {
    number: number
    productName: string
    product?: string
    unit: string
    count: number
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