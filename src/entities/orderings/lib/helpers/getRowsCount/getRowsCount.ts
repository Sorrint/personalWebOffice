import { type IOrderingChapter } from '../../../model/types/ordering';

export const getRowsCount = (chapters: Record<string, IOrderingChapter>) =>
  Object.values(chapters).reduce((acc, item) => (acc += item.summary.rowsCount), 0);
