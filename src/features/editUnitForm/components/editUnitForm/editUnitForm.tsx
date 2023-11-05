import { useForm } from 'react-hook-form';

import { UnitSelect, type IUnit, useCreateNewUnit } from '@entities/units';
import { renderRHFTextField } from '@shared/ui/reactHookFormFields';
import { EditPropertyField } from '@shared/ui/editPropertyField';
import { Button } from '@shared/ui/button';

import styles from './editUnitForm.module.scss';

interface EditPackageFormProps {
    unit?: IUnit
}

export const EditUnitForm = ({unit}: EditPackageFormProps) => {

    const {register, handleSubmit} = useForm<IUnit>({
        defaultValues: unit
    });

    const [ createUnit ] = useCreateNewUnit();

    const editUnit = (data: IUnit) => {
        createUnit(data);
    };

    return (
        <>
            <UnitSelect />
            <div className={styles['unit-card']}>
                <EditPropertyField 
                    propertyName="Тип единицы измерения" 
                    renderEditField={() => renderRHFTextField<IUnit>({fieldName: 'type', register, textFieldType: 'text' })}
                    className="unitProperty"
                />
                <EditPropertyField 
                    propertyName="Базовое значения (в 1000)" 
                    renderEditField={() => renderRHFTextField<IUnit>({fieldName: 'base', register, textFieldType: 'number' })}
                    className="unitProperty"
                />
                <EditPropertyField 
                    propertyName="Описание" 
                    renderEditField={() => renderRHFTextField<IUnit>({fieldName: 'description', register, textFieldType: 'text' })}
                    className="unitProperty"
                />
                <Button classname='unitSubmit' onClick={handleSubmit(editUnit)}>Добавить единицу измерения</Button>
            </div>
        </>
    );
};