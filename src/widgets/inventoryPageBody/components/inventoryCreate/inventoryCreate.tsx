import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@shared/ui/button/button';
import { Calendar } from '@shared/ui/calendar';
import { TextField } from '@shared/ui/textField';
import { useGetCounter } from '@shared/api/countersAPI';
import { useCreateInventory } from '@entities/inventories';

import styles from './inventoryCreate.module.scss';
import { AppRoutes } from '@shared/config/router';
import { Grid } from '@shared/ui/grid';
import { FormValues } from '../model/types/types';

export const InventoryCreate = () => {
  const navigate = useNavigate();
  const [createDoc] = useCreateInventory();
  const { data } = useGetCounter('docNumber', { refetchOnMountOrArgChange: true });
  const { register, handleSubmit, control, setValue } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      storeName: 'Сатурн',
      comment: '',
      company: '',
    },
  });
  useEffect(() => {
    if (data) {
      setValue('documentNumber', data);
    }
  }, [data, setValue]);

  const onSubmit = async ({ chosenDate, comment, company, documentNumber }: FormValues) => {
    const doc = await createDoc({
      comment,
      choosenDate: chosenDate,
      documentNumber,
      storeName: company,
    });

    if ('data' in doc) {
      const number = doc.data.documentNumber.toString();
      if (number) {
        navigate(AppRoutes.getInventoryDetailsRoute(number));
      }
    }
  };
  return (
    <Grid>
      <div className={styles['card-title']}>Новый документ</div>
      <form className={styles['inventory-form']}>
        <TextField
          label='Номер документа'
          {...register('documentNumber', { pattern: /^[0-9]*$/ })}
          type='number'
        />
        <Calendar
          label='Дата документа'
          wrapperName='calendar__wrapper'
          control={control}
          name={'choosenDate'}
          full
        />
        <TextField label='Магазин' {...register('storeName')} />
        <TextField label='Комментарий' {...register('comment')} className={styles.comment} />
      </form>
      <Button onClick={handleSubmit(onSubmit)}>Создать</Button>
    </Grid>
  );
};
