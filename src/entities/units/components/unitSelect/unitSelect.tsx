import { useCallback } from 'react';

import { SelectListBox } from '@shared/ui/selectListBox';

import { type IUnit, type UnitTypes } from '../../model/unitTypes';
import { type ListBoxItem } from '@shared/ui/selectListBox/selectListBox';
interface UnitSelectProps {
    classname?: string
    id?: string
    onChange?: (id: string)=> void
    units: IUnit[]
    type: UnitTypes
}

export const UnitSelect = (props: UnitSelectProps) => {
    const { id, onChange, units, type } = props;
    
    const currentUnits = units?.filter((unit)=> type && unit.type.includes(type));
    const options: ListBoxItem[] = currentUnits?.map((unit)=> ({...unit, content: unit.description}));
    const onChangeHandler = useCallback(
        (id: string) => {
            onChange?.(id);
        },
        [onChange],
    );

    return <>{options && (<SelectListBox value={id ?? ''} options={options} defaultValue='Ед. изм.' onChange={onChangeHandler}/>)}</>;
};