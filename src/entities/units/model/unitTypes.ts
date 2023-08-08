import { type UnitTypes } from "@entities/units/components/unitTypeSelect/unitTypeSelect";


export interface IUnit {
    _id?: string
    type: UnitTypes[]
    base: number
    description: string
}