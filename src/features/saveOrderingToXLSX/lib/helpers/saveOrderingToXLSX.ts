import { type ColInfo } from 'xlsx';

export const saveOrderingToXLSX = async <T>(data: T[], name: string): Promise<void> => {
    const { writeFileXLSX, utils } = await import('xlsx')
    const wb = utils.book_new();

    const longitudes = [5, 50, 10, 10, 20];
    const propiedades: ColInfo[] = [];

    longitudes.forEach((col) => {
        propiedades.push({
            width: col,

        });
    });
  
    const ws = utils.json_to_sheet<T>(data);
    ws['!cols'] = propiedades;

    utils.book_append_sheet(wb, ws, 'Data');
    return writeFileXLSX(wb, name);
};




  