import { useForm } from 'react-hook-form';

import { type Package, PackageSelect, useCreateNewPackage } from '@entities/Packages';
import { PropertyField } from '@shared/ui/PropertyField/PropertyField';
import { RenderRHFTextField } from '@shared/ui/ReactHookFormFields';
import { Button } from '@shared/ui/Button';
import style from './EditPackageForm.module.scss';

interface EditPackageFormProps {
  packageBox?: Package;
}

export const EditPackageForm = ({ packageBox }: EditPackageFormProps) => {
  const { register, handleSubmit } = useForm<Package>({
    defaultValues: packageBox,
  });

  const [createPackage] = useCreateNewPackage();

  const editPackage = (data: Package) => {
    createPackage(data);
  };

  return (
    <>
      <PackageSelect />
      <div className={style.card}>
        <PropertyField
          propertyName='Наименование'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            RenderRHFTextField<Package>({ fieldName: 'name', register, textFieldType: 'text' })
          }
          className='packageProperty'
        />
        <PropertyField
          propertyName='Категория'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            RenderRHFTextField<Package>({ fieldName: 'category', register, textFieldType: 'text' })
          }
          className='packageProperty'
        />
        <PropertyField
          propertyName='Объем'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            RenderRHFTextField<Package>({ fieldName: 'volume', register, textFieldType: 'number' })
          }
          className='packageProperty'
        />
        <PropertyField
          propertyName='Вес (в граммах)'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            RenderRHFTextField<Package>({ fieldName: 'weight', register, textFieldType: 'number' })
          }
          className='packageProperty'
        />
        <PropertyField
          propertyName='Цвет'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            RenderRHFTextField<Package>({ fieldName: 'color', register, textFieldType: 'text' })
          }
          className='packageProperty'
        />
        <Button className='packageSubmit' onClick={handleSubmit(editPackage)}>
          Добавить упаковку
        </Button>
      </div>
    </>
  );
};
