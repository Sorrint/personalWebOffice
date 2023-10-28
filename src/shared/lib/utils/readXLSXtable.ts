export type SheetData = Record<string, unknown>;

export const readXLSXTable = async (e: React.BaseSyntheticEvent, sheetName: string): Promise<SheetData[] | string> => {
    e.preventDefault();
    const { read, utils } = await import('xlsx')
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = read(data, { WTF: true, sheets: sheetName });
    const jsonData = utils.sheet_to_json<SheetData>(workbook.Sheets[sheetName], { header: 'A' });
    const result = jsonData.length ? jsonData : 'Страница не найдена';
    if (typeof result === 'string') console.log(result);
    return result;
};
