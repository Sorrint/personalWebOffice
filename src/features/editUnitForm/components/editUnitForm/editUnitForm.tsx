import { useForm } from 'react-hook-form';

import { UnitSelect, type IUnit, useCreateNewUnit } from '@entities/units';
import { renderRHFTextField } from '@shared/ui/reactHookFormFields';
import { PropertyField } from '@shared/ui/PropertyField';
import { Button } from '@shared/ui/button';

import styles from './editUnitForm.module.scss';

interface EditPackageFormProps {
  unit?: IUnit;
}

export const EditUnitForm = ({ unit }: EditPackageFormProps) => {
  const { register, handleSubmit } = useForm<IUnit>({
    defaultValues: unit,
  });

  const [createUnit] = useCreateNewUnit();

  const editUnit = (data: IUnit) => {
    createUnit(data);
  };

  return (
    <>
      <UnitSelect />
      <div className={styles['unit-card']}>
        <PropertyField
          propertyName='Тип единицы измерения'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            renderRHFTextField<IUnit>({ fieldName: 'type', register, textFieldType: 'text' })
          }
          className='unitProperty'
        />
        <PropertyField
          propertyName='Базовое значения (в 1000)'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            renderRHFTextField<IUnit>({ fieldName: 'base', register, textFieldType: 'number' })
          }
          className='unitProperty'
        />
        <PropertyField
          propertyName='Описание'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            renderRHFTextField<IUnit>({ fieldName: 'description', register, textFieldType: 'text' })
          }
          className='unitProperty'
        />
        <Button classname='unitSubmit' onClick={handleSubmit(editUnit)}>
          Добавить единицу измерения
        </Button>
      </div>
    </>
  );
};
