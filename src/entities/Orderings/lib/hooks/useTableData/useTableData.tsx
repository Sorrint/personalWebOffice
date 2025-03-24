import { useMemo } from 'react';
import { type OrderingRecordDisplay, type OrderingChapter } from '../../../model/types/ordering';
import { ChapterSummary } from '../../../components/OrderingProductsList/ChapterSummary/ChapterSummary';
import { getCountInRowsText, getRowsCountText } from '../../helpers/getOrderingTexts';
import { EditRows } from '../../../model/types/editRows';

type EditRowsArg = Parameters<typeof getSummaryRecord>[1];

const getSummaryRecord = (
  summary: Omit<OrderingChapter, 'records'>,
  editRows?: EditRows,
): Partial<OrderingRecordDisplay> => {
  const { productsCount, rowsCount, countOfPackages, text, packageCategory } = summary;

  const chapterText = getCountInRowsText(text, countOfPackages);
  const rowsCountText = getRowsCountText(rowsCount, countOfPackages);

  return {
    count: () => <ChapterSummary children={productsCount} />,
    productName: () => <ChapterSummary children={chapterText} />,
    rows: () => (
      <ChapterSummary>
        {rowsCountText}
        {!!packageCategory && editRows?.({ category: packageCategory, rowsCount })}
      </ChapterSummary>
    ),
  };
};

export interface UseTableDataProps {
  records?: OrderingChapter[];
  editRows?: EditRowsArg;
}

const useTableData = ({ records, editRows }: UseTableDataProps) => {
  if (!records) {
    return null;
  }

  const data = useMemo(
    () =>
      records.reduce(
        (
          acc: Partial<OrderingRecordDisplay>[],
          { records: products, ...summary }: OrderingChapter,
        ) => {
          products.map(record => acc.push(record));
          acc.push(getSummaryRecord(summary, editRows));
          return acc;
        },
        [],
      ),
    [records, editRows],
  );

  return data;
};

export default useTableData;
