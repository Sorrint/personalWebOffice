//удаляет лишние пробелы и добавляет пробел перед "кг"
export const transformProductName = (name: string): string => {
    return name.trim().replace(/([^\w]|^)\s+|\s+([^\w\s]|$)|(\d)\s*(кг)\b/g, '$1$2$3 $4');
};
