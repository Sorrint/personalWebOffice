import { SelectListBox } from '@shared/ui/selectListBox/selectListBox';
import { useGetPackages } from '../../api/packagesApi';
import './packageSelect.scss';
import  { type IPackage } from '@entities/packages/model/packagesTypes';
import { useCallback } from 'react';
interface PackageSelectProps {
    classname?: string
    id?: string
    onChange?: (id: string)=> void
    content?: 'category' | 'name'
}

export const PackageSelect = (props: PackageSelectProps) => {
    const { id, onChange, content = 'name' } = props;
    
    const { data: packages } = useGetPackages();

    const options = packages?.map((pack)=> ({...pack, content: pack[content]}));
    
    const onChangeHandler = useCallback(
        (id: string) => {
            onChange?.(id);
        },
        [onChange],
    );

    return <>{packages && (<SelectListBox value={id ?? ''} options={options} defaultValue='Выберите упаковку' onChange={onChangeHandler}/>)}</>;
};