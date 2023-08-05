export enum UnitTypes {
    COUNTABLE = 'штучный',
    SCALABLE = 'мерный'   
}

export interface IUnit {
    _id?: string
    type: UnitTypes
    base: number
    description: string
}