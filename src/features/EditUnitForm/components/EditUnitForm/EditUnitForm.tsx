import { useForm } from 'react-hook-form';

import { UnitSelect, type Unit, useCreateNewUnit } from '@entities/Units';
import { RenderRHFTextField } from '@shared/ui/ReactHookFormFields';
import { PropertyField } from '@shared/ui/PropertyField';
import { Button } from '@shared/ui/Button';

import style from './EditUnitForm.module.scss';

interface EditPackageFormProps {
  unit?: Unit;
}

export const EditUnitForm = ({ unit }: EditPackageFormProps) => {
  const { register, handleSubmit } = useForm<Unit>({
    defaultValues: unit,
  });

  const [createUnit] = useCreateNewUnit();

  const editUnit = (data: Unit) => {
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
            RenderRHFTextField<Unit>({ fieldName: 'type', register, textFieldType: 'text' })
          }
          className='unitProperty'
        />
        <PropertyField
          propertyName='Базовое значения (в 1000)'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            RenderRHFTextField<Unit>({ fieldName: 'base', register, textFieldType: 'number' })
          }
          className='unitProperty'
        />
        <PropertyField
          propertyName='Описание'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            RenderRHFTextField<Unit>({ fieldName: 'description', register, textFieldType: 'text' })
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
