import { SelectListBox } from "@shared/ui/selectListBox/selectListBox";
import type { ChangeEvent} from "react";
import type { RefCallBack } from "react-hook-form";

interface IProductCollectionListProps {
    name: string
    onChange: (e: ChangeEvent) => void
    ref: RefCallBack
}

export const ProductCollectionList = (props: IProductCollectionListProps) => {
    const {onChange, name, ref} = props;
    const collections = [
        { id: '1', value: '1, 1,5 кг'},
        { id: '2', value: '2,5 3 кг низ'},
        { id: '3', value: '3, 5 кг выс'},
        { id: '4', value: '4,5 кг кан'},
    ];
    const selected = collections.find((item)=> item.value === '2,5 3 кг низ') ?? collections[0];

    return <SelectListBox options={collections} selected={selected} onChange={onChange} name={name} ref={ref}/>;
};