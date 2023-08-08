import { useGetUnits } from '@entities/units/api/unitesApi';
import { SelectListBox } from '@shared/ui/selectListBox';
import { useCallback } from 'react';
import { type UnitTypes } from '../unitTypeSelect/unitTypeSelect';
interface UnitSelectProps {
    classname?: string
    id?: string
    onChange?: (id: string)=> void
    type?: UnitTypes
}

export const UnitSelect = (props: UnitSelectProps) => {
    const { id, onChange, type } = props;
    
    const { data: units } = useGetUnits();
    const currentUnits = units?.filter((unit)=> type && unit.type.includes(type));
    const options = currentUnits?.map((unit)=> ({...unit, content: unit.description}));

    const onChangeHandler = useCallback(
        (id: string) => {
            onChange?.(id);
        },
        [onChange],
    );

    return <>{units && (<SelectListBox value={id ?? ''} options={options} defaultValue='Ед. изм.' onChange={onChangeHandler}/>)}</>;
};