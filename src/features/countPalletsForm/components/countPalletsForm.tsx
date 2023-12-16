import { TextField } from '@shared/ui/textField';
import styles from './countPalletsForm.module.scss';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { type Pallets } from '@entities/orderings';
import { IconFont } from '@shared/ui/iconFont';
import { Button } from '@shared/ui/button';

interface CountPalletsFormProps {
    classname?: string
    onChange?: (palletsObj: Record<Pallets, number>) => void
}
export const CountPalletsForm = ({classname, onChange}: CountPalletsFormProps) => {

    const {register, handleSubmit} = useForm<Record<Pallets, number>>({
        defaultValues: {
            pallets: 0,
            pallets125: 0,
            pallets99: 0
        }
    })

    const onSubmit = (palletsObj: Record<Pallets, number>) => {
        onChange?.(palletsObj)
    }

    return <form className={classNames(styles.component, classname)}>
        <TextField type='number' label='Паллета 125' {...register('pallets125', {valueAsNumber: true})}/>
        <TextField type='number' label='Паллета 99' {...register('pallets99', {valueAsNumber: true})}/>
        <TextField type='number' label='Поддон' {...register('pallets', {valueAsNumber: true})}/>
        <Button classname={styles.button} onClick={handleSubmit(onSubmit)}><IconFont iconName='icon-package-box' /></Button>
    </form>;
};