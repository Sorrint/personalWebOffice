import { type IOrderingChapter } from '../../../model/types/ordering'


export const getCountInRowsText = (summary: IOrderingChapter['summary']) => {
    return summary.text ? summary.text : `В ряду ${summary.countOfPackages} шт.`
}