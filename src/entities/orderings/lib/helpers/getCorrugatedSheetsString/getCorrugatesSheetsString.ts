import { CorrugatedSheets } from "../../../consts/corrugatedSheetsConsts";
import { type ICorrugatedSheetsCount } from "../../../model/types/ordering";


export const getCorrugatesSheetsString = (sheetsObject: Partial<ICorrugatedSheetsCount>) => {
    return Object.entries(sheetsObject).map(([key, value]) => {
        return value && `${value} шт ${CorrugatedSheets[key as keyof typeof sheetsObject]}`;
    }).join(', ');
};