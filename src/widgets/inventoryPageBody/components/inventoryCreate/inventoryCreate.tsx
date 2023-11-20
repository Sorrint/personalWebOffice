import { useEffect } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@shared/ui/button/button';
import { Calendar } from '@shared/ui/calendar';
import { TextField } from '@shared/ui/textField';
import { useGetCounter } from '@shared/api/countersAPI';
import { useCreateNewDocument } from '@entities/inventoryDocs';

import styles from './inventoryCreate.module.scss';
import { AppRoutes } from '@shared/config/router';

export const InventoryCreate = () => {
    const navigate = useNavigate();
    const [createDoc] = useCreateNewDocument();
    const { data } = useGetCounter('docNumber', { refetchOnMountOrArgChange: true });
    const { register, handleSubmit, control, setValue } = useForm({
        mode: 'onChange',
        defaultValues: {
            documentNumber: '',
            storeName: 'Сатурн',
            comment: '',
            choosenDate: Date.now()
        }
    });
    useEffect(() => {
        if (data) {
            setValue('documentNumber', data);
        }
    }, [data]);

    const onSubmit = async <T extends FieldValues>(data: T) => {
        const transformData = { ...data };
        const doc = await createDoc(transformData);

        if ('data' in doc) {
            const number = doc.data.documentNumber
            if (number) {
                navigate(AppRoutes.getInventoryDetailsRoute(number));
            }
        }
    };
    return (
        <>
            <div className={styles['card-title']}>Новый документ</div>
            <form className={styles['inventory-form']}>
                <TextField
                    full
                    label="Номер документа"
                    {...register('documentNumber', { pattern: /^[0-9]*$/ })}
                    type="number"
                />
                <Calendar
                    label="Дата документа"
                    wrapperName="calendar__wrapper"
                    control={control}
                    name={'choosenDate'}
                    full
                />
                <TextField 
                    full
                    label="Магазин" 
                    {...register('storeName')} />
                <TextField 
                    full
                    label="Комментарий" 
                    {...register('comment')} 
                    className={styles.comment}/>
            </form>
            <Button onClick={handleSubmit(onSubmit)}>
                Создать
            </Button>
        </>
    );
};
