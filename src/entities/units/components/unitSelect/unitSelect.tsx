import { useSelector } from 'react-redux';
import { useCallback } from 'react';

import { type ListBoxItem, SelectListBox } from '@shared/ui/selectListBox';

import { type UnitTypes } from '../../model/unitTypes';
import { selectAllUnits } from '../../api/unitsApi';

interface UnitSelectProps  {
    classname?: string
    id?: string
    onChange?: (id: string)=> void
    type?: UnitTypes
}

export const UnitSelect = (props: UnitSelectProps) => {
    const { id, onChange, type } = props;
    const units = useSelector(selectAllUnits);
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