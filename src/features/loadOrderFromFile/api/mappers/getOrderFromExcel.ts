import { IOrderRecord, IOrderRecords } from '@entities/orders';
import { parseSheetData } from '@shared/lib/utils/parseSheetData';
import { readXLSXTable } from '@shared/lib/utils/readXLSXtable';
import { z } from 'zod';
import { normalizeData } from '@shared/lib/helpers';

const headersMap: Record<string, keyof IOrderRecord> = {
  '№': 'number',
  'Товары (работы, услуги)': 'productName',
  'Кол-во': 'count',
  'Ед.': 'unit',
};

const OrderSchema: z.Schema<IOrderRecord> = z.object({
  number: z.number(),
  productName: z.string(),
  count: z.number(),
  unit: z.string(),
});

interface GetOrderResult {
  records?: IOrderRecords;
  duplicatedRecords?: IOrderRecord[];
  parseError?: string;
}

export const getOrderFromExcel = async (
  e: React.BaseSyntheticEvent,
): Promise<GetOrderResult | null> => {
  const data = await readXLSXTable(e, 'TDSheet');
  if (typeof data === 'string') return null;

  const parsedData = parseSheetData({ data, startItem: '№', headersMap, schema: OrderSchema });

  const { data: orderRecords, parseError } = parsedData;

  if (parseError) {
    return { parseError };
  }

  const { data: records, duplicatedKeysData: duplicatedRecords } = normalizeData(
    orderRecords,
    'number',
  );

  return { records, duplicatedRecords };
};
