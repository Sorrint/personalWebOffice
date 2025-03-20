import { useForm } from 'react-hook-form';

import { type IPackage, PackageSelect, useCreateNewPackage } from '@entities/packages';
import { PropertyField } from '@shared/ui/PropertyField/PropertyField';
import { renderRHFTextField } from '@shared/ui/reactHookFormFields';
import { Button } from '@shared/ui/button';
import styles from './editPackageForm.module.scss';

interface EditPackageFormProps {
  packageBox?: IPackage;
}

export const EditPackageForm = ({ packageBox }: EditPackageFormProps) => {
  const { register, handleSubmit } = useForm<IPackage>({
    defaultValues: packageBox,
  });

  const [createPackage] = useCreateNewPackage();

  const editPackage = (data: IPackage) => {
    createPackage(data);
  };

  return (
    <>
      <PackageSelect />
      <div className={styles.card}>
        <PropertyField
          propertyName='Наименование'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            renderRHFTextField<IPackage>({ fieldName: 'name', register, textFieldType: 'text' })
          }
          className='packageProperty'
        />
        <PropertyField
          propertyName='Категория'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            renderRHFTextField<IPackage>({ fieldName: 'category', register, textFieldType: 'text' })
          }
          className='packageProperty'
        />
        <PropertyField
          propertyName='Объем'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            renderRHFTextField<IPackage>({ fieldName: 'volume', register, textFieldType: 'number' })
          }
          className='packageProperty'
        />
        <PropertyField
          propertyName='Вес (в граммах)'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            renderRHFTextField<IPackage>({ fieldName: 'weight', register, textFieldType: 'number' })
          }
          className='packageProperty'
        />
        <PropertyField
          propertyName='Цвет'
          //@ts-expect-error что-то было удалено
          renderEditField={() =>
            renderRHFTextField<IPackage>({ fieldName: 'color', register, textFieldType: 'text' })
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
