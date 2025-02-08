import { type IOrderingChapter } from '../../model/types/ordering';
import { SLIPSHEETWEIGHT } from '../../consts/slipSheetsConsts';

export const getRowsCount = (chapters: Record<string, IOrderingChapter>) =>
  Object.values(chapters).reduce((acc, item) => (acc += item.summary.rowsCount), 0);

export const getSlipSheetsCount = (rowsCount: number) => +(Math.ceil(rowsCount + 1) / 4).toFixed(2);

export const getSlipSheetsWeight = (count: number) => count * SLIPSHEETWEIGHT;

export const getCountInRowsText = (summary: IOrderingChapter['summary']) => {
  return summary.text ? summary.text : `В ряду ${summary.countOfPackages} шт.`;
};
