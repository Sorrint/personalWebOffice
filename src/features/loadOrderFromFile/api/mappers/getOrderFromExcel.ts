import { parseSheetData } from '@shared/lib/utils/parseSheetData';
import { readXLSXTable } from '@shared/lib/utils/readXLSXtable';
import { replaceObjectKeys } from '@shared/lib/utils/replaceObjectKeys';

const headersOrderObject = {
    '№': 'number',
    'Товары (работы, услуги)': 'productName',
    'Кол-во': 'count',
    'Ед.': 'unit'
};

export const getOrderFromExcel = async (e: React.BaseSyntheticEvent) => {
    const data = await readXLSXTable(e, 'TDSheet');
    if (typeof data === 'string') return null;
    const parse = parseSheetData(data, '№');
    if (typeof parse === 'string') return null;
    const result = parse.tableBody
        .map((item) => replaceObjectKeys(headersOrderObject, item))
        .filter((item) => item.productName);
    return result;
};
