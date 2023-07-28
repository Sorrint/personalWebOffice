import { SelectListBox } from "@shared/ui/selectListBox/selectListBox";

interface ProductUnitListProps {
    selected?: string
    onChange?: (e: string)=> void
}
interface IUnitOption {
    value: string
    id: number
    type: 'scalable' | 'countable'
    base: number
}

export const ProductUnitList = ({selected, onChange}: ProductUnitListProps) => {

    const options: IUnitOption[] = [
        {id: 1, type: 'scalable', value: 'г', base: 1},
        {id: 2, type: 'scalable', value: 'кг', base: 1000},
        {id: 3, type: 'countable', value: 'шт', base: 1000}
    ];

    const currentUnitType = options.filter((option) => option.type==='scalable');
    const currentUnit = currentUnitType?.find((unit)=> unit?.value === selected) ?? currentUnitType[0];

    const handleChange = (selected: IUnitOption) =>  {
        onChange?.(selected.value);
    };

    return <SelectListBox options={currentUnitType} selected={currentUnit} onChange={handleChange}/>;
};