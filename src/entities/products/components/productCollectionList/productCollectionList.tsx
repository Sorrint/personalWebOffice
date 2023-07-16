import { SelectListBox } from "@shared/ui/selectListBox/selectListBox";



export const ProductCollectionList = () => {
    const collections = [
        { id: '1', value: '1, 1,5 кг'},
        { id: '2', value: '2,5 3 кг низ'},
        { id: '3', value: '3, 5 кг выс'},
        { id: '4', value: '4,5 кг кан'},
    ];

    return <SelectListBox options={collections} selected={collections[0].value}/>;
};