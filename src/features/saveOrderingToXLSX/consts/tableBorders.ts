import { type Borders } from 'exceljs';

export const tableBorders: Record<string, Partial<Borders>> = {
    leftCellBorder: {
        left: {style: 'medium'}, right: {style: 'thin'}
    },
    rightCellBorder: {
        left: {style: 'thin'}, right: {style: 'medium'}
    },
    middleCellBorder: {
        left: {style: 'thin'}, right: {style: 'thin'}
    },

} as const


export const rowCellsStyle: Partial<Borders>[]  = [
    {},
    tableBorders.leftCellBorder,
    tableBorders.middleCellBorder,
    tableBorders.middleCellBorder,
    tableBorders.middleCellBorder,
    tableBorders.middleCellBorder,
    tableBorders.rightCellBorder
]

export const headerRowBorder: Partial<Borders> = { top: {style: 'medium'}, bottom: {style: 'medium'}}

