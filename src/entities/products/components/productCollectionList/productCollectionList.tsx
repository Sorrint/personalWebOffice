import { SelectListBox } from "@shared/ui/selectListBox/selectListBox";
import { useState} from "react";

interface IProductCollectionListProps {
    onChange?: (e: ICollection)=> void 
    selected?: ICollection
}

export interface ICollection {
    id: string
    value: string
}

export const ProductCollectionList = (props: IProductCollectionListProps) => {
    const {onChange, selected} = props;
    const collections = [
        { id: '1', value: '1, 1,5 кг'},
        { id: '2', value: '2,5 3 кг низ'},
        { id: '3', value: '3, 5 кг выс'},
        { id: '4', value: '4,5 кг кан'},
    ];
    const defaultValue = collections[0];
    const handleChange = (value: ICollection) =>  {
        onChange?.(value);
    };

    return <SelectListBox options={collections} selected={selected ?? defaultValue} onChange={handleChange}/>;
};