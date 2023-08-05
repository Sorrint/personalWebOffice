import type { IPackage } from "@entities/packages";
import { EditPropertyField } from "@shared/ui/editPropertyField/editPropertyField";
import { renderRHFTextField } from "@shared/ui/reactHookFormFields";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import './editPackageForm.scss';
import { Button } from "@shared/ui/button";
import { useCreateNewPackage } from "@entities/packages/api/packagesApi";
import { PackageSelect } from "@entities/packages";

interface EditPackageFormProps {
    packageBox?: IPackage
}

export const EditPackageForm: FC<EditPackageFormProps> = ({packageBox}) => {

    const {register, handleSubmit} = useForm<IPackage>({
        defaultValues: packageBox
    });

    const [ createPackage ] = useCreateNewPackage();

    const editPackage = (data: IPackage) => {
        createPackage(data);
    };

    return (
        <>
            <PackageSelect />
            <div className="editPackageCard">
                <EditPropertyField 
                    propertyName="Наименование" 
                    renderEditField={() => renderRHFTextField<IPackage>({fieldName: 'name', register, textFieldType: 'text' })}
                    className="packageProperty"
                />
                <EditPropertyField 
                    propertyName="Категория" 
                    renderEditField={() => renderRHFTextField<IPackage>({fieldName: 'category', register, textFieldType: 'text' })}
                    className="packageProperty"
                />
                <EditPropertyField 
                    propertyName="Объем" 
                    renderEditField={() => renderRHFTextField<IPackage>({fieldName: 'volume', register, textFieldType: 'number' })}
                    className="packageProperty"
                />
                <EditPropertyField 
                    propertyName="Вес (в граммах)" 
                    renderEditField={() => renderRHFTextField<IPackage>({fieldName: 'weight', register, textFieldType: 'number' })}
                    className="packageProperty"
                />
                <EditPropertyField 
                    propertyName="Цвет" 
                    renderEditField={() => renderRHFTextField<IPackage>({fieldName: 'color', register, textFieldType: 'text' })}
                    className="packageProperty"
                />
                <Button className='packageSubmit' onClick={handleSubmit(editPackage)}>Добавить упаковку</Button>
            </div>
        </>
    );
};