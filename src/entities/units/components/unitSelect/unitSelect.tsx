import { useGetUnits } from '@entities/units/api/unitesApi';
import { SelectListBox } from '@shared/ui/selectListBox';
import { useCallback } from 'react';
interface UnitSelectProps {
    classname?: string
    id?: string
    onChange?: (id: string)=> void
}

export const UnitSelect = (props: UnitSelectProps) => {
    const { id, onChange } = props;
    
    const { data: units } = useGetUnits();

    const options = units?.map((unit)=> ({...unit, content: unit.description}));
    
    const onChangeHandler = useCallback(
        (id: string) => {
            onChange?.(id);
        },
        [onChange],
    );

    return <>{units && (<SelectListBox value={id ?? ''} options={options} defaultValue='Ед. изм.' onChange={onChangeHandler}/>)}</>;
};