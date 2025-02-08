import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';
import { TextField } from '@shared/ui/textField';
import { Calendar } from '@shared/ui/calendar';
import { Button } from '@shared/ui/button';
import { Suspense, useEffect } from 'react';
import { FormValues } from '../../model/types/types';
import { Grid } from '@shared/ui/grid';
import styles from './CreateDocumentForm.module.scss';

const defaultValues: DefaultValues<FormValues> = {
  company: '',
  choosenDate: new Date(),
  comment: '',
};

interface CreateDocumentFormProps {
  onSubmit: SubmitHandler<FormValues>;
  initialValues: Partial<FormValues>;
}

export const CreateDocumentForm = ({ onSubmit, initialValues }: CreateDocumentFormProps) => {
  const { register, handleSubmit, control, reset } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
  });

  useEffect(() => {
    reset({ ...defaultValues, ...initialValues });
  }, [initialValues, reset]);

  return (
    <Grid>
      <div className={styles.title}>Новый документ</div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='Номер документа'
          {...register('documentNumber', { pattern: /^[0-9]*$/ })}
          type='number'
        />
        <Suspense>
          <Calendar
            label='Дата документа'
            wrapperName='calendar__wrapper'
            control={control}
            name={'choosenDate'}
            full
          />
        </Suspense>
        <TextField label='Организация' {...register('company')} />
        <TextField label='Комментарий' {...register('comment')} className={styles.comment} />
      </form>
      <Button onClick={handleSubmit(onSubmit)}>Создать</Button>
    </Grid>
  );
};
