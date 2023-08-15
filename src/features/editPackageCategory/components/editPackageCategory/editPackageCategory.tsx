import { memo, useCallback } from "react";
import { type PathValue, useForm, type Path } from "react-hook-form";

import  { type IPackageCategory, PackageSelect } from "@entities/packages";
import { EditPropertyField } from "@shared/ui/editPropertyField/editPropertyField";
import { renderRHFTextField } from "@shared/ui/reactHookFormFields";
import { Button } from "@shared/ui/button";

import { useCreatePackageCategory } from "../../api/editPackageCategoryApi";
import './editPackageCategory.scss';

interface EditPackageCategoryProps {
    packageCategory?: IPackageCategory
}

export const EditPackageCategory = memo(({packageCategory}: EditPackageCategoryProps) => {

    const {register, handleSubmit, watch, setValue} = useForm<IPackageCategory>({defaultValues: packageCategory});

    const [ createPackageCategory ] = useCreatePackageCategory();

    const editPackage = useCallback((data: IPackageCategory) => {
        createPackageCategory(data);
    }, [createPackageCategory]);

    const handleSet = useCallback(<T extends Path<IPackageCategory>> (key: T, value: PathValue<IPackageCategory, T>) => {
    //@ts-ignore-next-line
        setValue(key, value);
    },[]);

    const currentPackage = watch('packageId');
    return (
        <>
            <div className="editPackageCard">

                <EditPropertyField 
                    propertyName="Наименование категории" 
                    renderEditField={() => renderRHFTextField<IPackageCategory>({fieldName: 'name', register, textFieldType: 'text' })}
                    className="packageProperty"
                />
                <EditPropertyField 
                    propertyName="Упаковка" 
                    renderEditField={() => <PackageSelect onChange={(value) => handleSet('packageId', value)} id={currentPackage} content='name'/>}
                    className="packageProperty"
                />
                <EditPropertyField 
                    propertyName="Количество товара" 
                    renderEditField={() => renderRHFTextField<IPackageCategory>({fieldName: 'countOfPackages', register, textFieldType: 'number' })}
                    className="packageProperty"
                />
                <Button className='packageSubmit' onClick={handleSubmit(editPackage)}>Добавить упаковку</Button>
            </div>
        </>
    );
});





