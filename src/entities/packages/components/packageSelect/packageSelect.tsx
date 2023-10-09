import { useCallback, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { SelectListBox } from '@shared/ui/selectListBox';

import { selectAllPackages, useGetPackages } from '../../api/packagesApi';
import './packageSelect.scss';
interface PackageSelectProps {
    classname?: string
    id?: string
    onChange?: (id: string)=> void
    content?: 'category' | 'name'
}

export const PackageSelect = memo((props: PackageSelectProps) => {
    useGetPackages();

    const { id, onChange, content = 'name' } = props;
    
    const packages = useSelector(selectAllPackages);

    const options = useMemo(()=>packages?.map((pack)=> ({...pack, content: pack[content]})),[packages]);
    
    const onChangeHandler = useCallback(
        (id: string) => {
            onChange?.(id);
        },
        [onChange],
    );

    return <>{packages && (<SelectListBox value={id ?? ''} options={options} defaultValue='Выберите упаковку' onChange={onChangeHandler}/>)}</>;
});