import { SelectListBox } from "@shared/ui/selectListBox/selectListBox";

type ProductType = 'COUNTABLE' | 'SCALABLE'

interface IProductTypeListProps {
    onChange?: (e: ProductType)=> void 
    selected?: ProductType
}

interface ITypeOptions {
    value: string,
    id: number,
    type: ProductType
}

export const ProductTypeList = (props: IProductTypeListProps) => {
    const {onChange, selected} = props;
    
    const options: ITypeOptions[] = [
        {id: 1, value: 'штучный', type: 'COUNTABLE'},
        {id: 2, value: 'мерный', type: 'SCALABLE'}
    ];
    
    const currentType = options.find((option) => option.type === selected) ?? options[0];
    const handleChange = (selected: ITypeOptions) =>  {
        onChange?.(selected.type);
    };

    return <SelectListBox options={options} selected={currentType} onChange={handleChange}/>;
};