import { useForm } from 'react-hook-form';

import { UnitSelect, type IUnit, useCreateNewUnit } from '@entities/Units';
import { RenderRHFTextField } from '@shared/ui/ReactHookFormFields';
import { PropertyField } from '@shared/ui/PropertyField';
import { Button } from '@shared/ui/Button';

import style from './EditUnitForm.module.scss';

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
      <div className={style['unit-card']}>
        <PropertyField
          propertyName='Тип единицы измерения'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            RenderRHFTextField<IUnit>({ fieldName: 'type', register, textFieldType: 'text' })
          }
          className='unitProperty'
        />
        <PropertyField
          propertyName='Базовое значения (в 1000)'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            RenderRHFTextField<IUnit>({ fieldName: 'base', register, textFieldType: 'number' })
          }
          className='unitProperty'
        />
        <PropertyField
          propertyName='Описание'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            RenderRHFTextField<IUnit>({ fieldName: 'description', register, textFieldType: 'text' })
          }
          className='unitProperty'
        />
        <Button className='unitSubmit' onClick={handleSubmit(editUnit)}>
          Добавить единицу измерения
        </Button>
      </div>
    </>
  );
};
