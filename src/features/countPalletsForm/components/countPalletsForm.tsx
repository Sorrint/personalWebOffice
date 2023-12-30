import { TextField } from '@shared/ui/textField';
import styles from './countPalletsForm.module.scss';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { type Pallets } from '@entities/orderings';
import { IconFont } from '@shared/ui/iconFont';
import { Button } from '@shared/ui/button';
import { useResize } from '@shared/lib/hooks';

interface CountPalletsFormProps {
    classname?: string
    onChange?: (palletsObj: Record<Pallets, number>) => void
}
export const CountPalletsForm = ({classname, onChange}: CountPalletsFormProps) => {
    const {isScreenMd} = useResize()


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
        <label className={styles.label}>
            {!isScreenMd && <span className={styles.span}>Паллета 125</span>}
            <TextField type='number' label={isScreenMd ? 'Паллета 125' : undefined} {...register('pallets125', {valueAsNumber: true})}/>
        </label>
        <label className={styles.label}>
            {!isScreenMd && <span className={styles.span}>Паллета 99</span>}
            <TextField type='number' label={isScreenMd ? 'Паллета 99' : undefined} {...register('pallets99', {valueAsNumber: true})}/>

        </label>
        <label className={styles.label}>    
            {!isScreenMd && <span className={styles.span}>Поддон</span>}
            <TextField type='number' label={isScreenMd ? 'Поддон' : undefined} {...register('pallets', {valueAsNumber: true})}/>

        </label>
        <Button classname={styles.button} onClick={handleSubmit(onSubmit)}><IconFont iconName='icon-check' /></Button>
    </form>;
};