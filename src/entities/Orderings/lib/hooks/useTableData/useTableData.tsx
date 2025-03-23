import { useMemo } from 'react';
import { type IOrderingRecordDisplay, type IOrderingChapter } from '../../../model/types/ordering';
import { ChapterSummary } from '../../../components/OrderingProductsList/ChapterSummary/ChapterSummary';
import { getCountInRowsText, getRowsCountText } from '../../helpers/getOrderingTexts';
import { EditRows } from '../../../model/types/editRows';

type EditRowsArg = Parameters<typeof getSummaryRecord>[1];

const getSummaryRecord = (
  summary: Omit<IOrderingChapter, 'records'>,
  editRows?: EditRows,
): Partial<IOrderingRecordDisplay> => {
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
  records?: IOrderingChapter[];
  editRows?: EditRowsArg;
  children: (data: Partial<IOrderingRecordDisplay>[]) => React.ReactNode;
}

const useTableData = ({ records, editRows, children }: UseTableDataProps) => {
  if (!records) {
    return null;
  }

  const data = useMemo(
    () =>
      records.reduce(
        (
          acc: Partial<IOrderingRecordDisplay>[],
          { records: products, ...summary }: IOrderingChapter,
        ) => {
          products.map(record => acc.push(record));
          acc.push(getSummaryRecord(summary, editRows));
          return acc;
        },
        [],
      ),
    [records, editRows],
  );

  return children(data);
};

export default useTableData;
