import { SheetData } from './readXLSXtable';
import { replaceObjectKeys } from './replaceObjectKeys';
export const parseSheetData = (data: SheetData[], startItem: string) => {
    const firstTableRow = data.find((item) => Object.values(item).find((item) => item === startItem));
    if (!firstTableRow) return 'Таблица не найдена';
    const table = data.slice(data.indexOf(firstTableRow));
    const result = table.map((item) => replaceObjectKeys(firstTableRow, item));
    return { tableHeader: result[0], tableBody: result.slice(1) };
};
