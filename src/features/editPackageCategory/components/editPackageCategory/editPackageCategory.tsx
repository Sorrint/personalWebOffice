import { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { type IPackageCategory } from '@entities/packages';
import { PropertyField } from '@shared/ui/PropertyField/PropertyField';
import { Button } from '@shared/ui/button';

import { useCreatePackageCategory } from '../../api/editPackageCategoryApi';
import styles from './editPackageCategory.module.scss';
import { TextField } from '@shared/ui/textField';

interface EditPackageCategoryProps {
  packageCategory?: IPackageCategory;
}

export const EditPackageCategory = memo(({ packageCategory }: EditPackageCategoryProps) => {
  const { register, handleSubmit } = useForm<IPackageCategory>({
    defaultValues: packageCategory,
  });

  const [createPackageCategory] = useCreatePackageCategory();

  const editPackage = useCallback(
    (data: IPackageCategory) => {
      createPackageCategory(data);
    },
    [createPackageCategory],
  );

  return (
    <>
      <div className={styles.card}>
        <PropertyField propertyName='Наименование категории'>
          <TextField {...register('name')} className={styles.input} />
        </PropertyField>
        <Button className='packageSubmit' onClick={handleSubmit(editPackage)}>
          Добавить упаковку
        </Button>
      </div>
    </>
  );
});

EditPackageCategory.displayName = 'EditPackageCategory';
