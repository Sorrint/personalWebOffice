import { SelectListBox } from '@shared/ui/selectListBox';

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
        { _id: '1', content: '1, 1,5 кг'},
        { _id: '2', content: '2,5 3 кг низ'},
        { _id: '3', content: '3, 5 кг выс'},
        { _id: '4', content: '4,5 кг кан'},
    ];
    const defaultValue = collections[0];
    const handleChange = (value: ICollection) =>  {
        onChange?.(value);
    };

    return <SelectListBox options={collections} selected={selected ?? defaultValue} onChange={handleChange}/>;
};