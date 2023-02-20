import { writeFileXLSX, utils } from 'xlsx';

export const saveToXLSX = <T>(data: T[], name: string): void => {
    const ws = utils.json_to_sheet<T>(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    return writeFileXLSX(wb, name);
};
