import { SelectListBox } from '@shared/ui/selectListBox';
import { useGetPackages } from '../../api/packagesApi';
import './packageSelect.scss';
import { useCallback, memo, useMemo } from 'react';
interface PackageSelectProps {
    classname?: string
    id?: string
    onChange?: (id: string)=> void
    content?: 'category' | 'name'
}

export const PackageSelect = memo((props: PackageSelectProps) => {
    const { id, onChange, content = 'name' } = props;
    
    const { data: packages } = useGetPackages();

    const options = useMemo(()=>packages?.map((pack)=> ({...pack, content: pack[content]})),[packages]);
    
    const onChangeHandler = useCallback(
        (id: string) => {
            onChange?.(id);
        },
        [onChange],
    );

    return <>{packages && (<SelectListBox value={id ?? ''} options={options} defaultValue='Выберите упаковку' onChange={onChangeHandler}/>)}</>;
});