export const saveToXLSX = async <T>(data: T[], name: string): Promise<void> => {
    const { writeFileXLSX, utils } = await import('xlsx')
    const ws = utils.json_to_sheet<T>(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    return writeFileXLSX(wb, name);
};
