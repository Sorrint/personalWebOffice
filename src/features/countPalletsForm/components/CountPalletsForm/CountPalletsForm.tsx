import { TextField } from '@shared/ui/textField';
import classNames from 'classnames';
import { useFieldArray, useForm } from 'react-hook-form';
import { IconFont } from '@shared/ui/iconFont';
import { Button } from '@shared/ui/button';
import { useResize } from '@shared/lib/hooks';
import { Pallet } from '@entities/orders';
import styles from './CountPalletsForm.module.scss';

type OrderRecord = Record<'pallets', Pallet[]>;

interface CountPalletsFormProps {
  classname?: string;
  orderNumber: string;
  pallets: Pallet[];
  onChange?(data: Pallet[]): void;
}

export const CountPalletsForm = ({ classname, pallets, onChange }: CountPalletsFormProps) => {
  const { isScreenMd } = useResize();

  const { register, control, handleSubmit } = useForm<OrderRecord>({
    defaultValues: { pallets },
  });

  const { fields } = useFieldArray({
    control,
    name: 'pallets',
  });

  const onSubmit = ({ pallets }: Record<'pallets', Pallet[]>) => {
    onChange?.(pallets);
  };

  return (
    <form className={classNames(styles.component, classname)}>
      {fields.map(({ name, _id }, index) => (
        <label className={styles.label} key={_id}>
          {!isScreenMd && <span className={styles.span}>{name}</span>}
          <TextField
            type='number'
            label={isScreenMd ? name : undefined}
            {...register(`pallets.${index}.count`, { valueAsNumber: true })}
          />
        </label>
      ))}
      <Button classname={styles.button} onClick={handleSubmit(onSubmit)}>
        <IconFont iconName='icon-check' />
      </Button>
    </form>
  );
};
