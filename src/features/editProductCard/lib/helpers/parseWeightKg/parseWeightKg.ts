//Парсит числа пред кг
export const parseWeightKg = (string: string) => {
    if (!string) return;
    const weightKg = string.match(/(\d+(?:,\d+)?)\s*кг/g);
    return weightKg ? parseFloat(weightKg[0].replace(',', '.')) : 1;
};