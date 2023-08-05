import { type IUnitOption } from "@entities/products/model/types/IStoreProduct";
import { SelectListBox } from "@shared/ui/selectListBox";

interface ProductUnitListProps {
    id?: string
    onChange?: (e: IUnitOption)=> void
}

export const ProductUnitList = ({id, onChange}: ProductUnitListProps) => {

    const options: IUnitOption[] = [
        {_id: '1', type: 'SCALABLE', content: 'г', base: 1},
        {_id: '2', type: 'SCALABLE', content: 'кг', base: 1000},
        {_id: '3', type: 'COUNTABLE', content: 'шт', base: 1000}
    ];

    const currentUnitType = options.filter((option) => option.type==='SCALABLE');

    const handleChange = (value: string) =>  {
        const chooseOption = options.find((option)=> option._id === value);
        chooseOption && onChange?.(chooseOption);
    };

    return <SelectListBox options={currentUnitType} value={id ?? ''} defaultValue="Выберите ед. изм." onChange={handleChange}/>;
};