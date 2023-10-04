import { PalletsText } from "../../../consts/palletsConsts";
import { type ICountOfPallets } from "../../../model/types/ordering";

export const getPalletsInfoString = (palletsObject: Partial<ICountOfPallets>) => {
    return Object.entries(palletsObject).map(([key, value]) => {
        const text = PalletsText[key](value);
        return text && `${value} ${text}`;
    }).join(', ');
};