import { UnitTypes } from '../../model/unitTypes';
import { SelectListBox } from '@shared/ui/selectListBox';

interface UnitTypeSelectProps {
    classname?: string
    type?: UnitTypes
    onChange?: (type: UnitTypes) => void
}
export const UnitTypeSelect = (props: UnitTypeSelectProps) => {
    const {onChange, type} = props;
    
    const options = [
        {_id: '1', content: 'штучный', value: UnitTypes.COUNTABLE},
        {_id: '2', content: 'мерный', value: UnitTypes.SCALABLE},
        {_id: '3', content: 'весовой', value: UnitTypes.WEIGHTABLE},
    ];
    
    const currentType = options.find((option) => option.value === type);

    const handleChange = (id: string) =>  {
        const selected = options.find(option => option._id === id);
        if (selected) {
            onChange?.(selected?.value);
        }
    };

    return <SelectListBox options={options} value={currentType?._id ?? ''} onChange={handleChange} defaultValue='Выберите тип товара'/>;
};