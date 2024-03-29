enum UnitTypes {
    COUNTABLE = 'COUNTABLE',
    SCALABLE = 'SCALABLE',   
    WEIGHTABLE = 'WEIGHTABLE'
}
export type ProductType = 'SCALABLE' | 'COUNTABLE'

export interface extraData {
    package?: string
    packageCategory?: string
    weight?: number
    weightUnit?: string
}

export interface IUnitOption {
    content: string
    _id: string
    type: ProductType
    base: number
}

export interface IStoreProduct {
    _id?: string
    name: string
    type?: UnitTypes
    quantity?: number
    department?: {
        id: number
        name: string
        tax: string
    }
    isMarked?: null | boolean
    price?: null | number
    stock?: null | IProductStock[]
    tax?: string
    unit?: string
    extraData?: extraData
}

export type IProductStock = [number, string, string, string, string];