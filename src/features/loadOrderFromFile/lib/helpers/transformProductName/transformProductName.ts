// удаляет лишние пробелы и добавляет пробел перед "кг"
export const transformProductName = (name: string): string => {
    return name
        .trim()
        .replace(/([^.,])(\d)/g, '$1 $2')
        .replace(/ +/g, ' ')
        .replace(/(\d+)кг/gi, '$1 кг');
};