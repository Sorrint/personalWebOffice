import { type FC, useEffect } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@shared/ui/button/button';
import { Calendar } from '@shared/ui/calendar';
import { TextField } from '@shared/ui/textField';
import { useGetCounter } from '@shared/api/countersAPI';
import { useCreateNewDocument } from '@entities/inventoryDocs';

import './inventoryCreate.scss';

export const InventoryCreate: FC = () => {
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
        await createDoc(transformData);
        navigate(-1);
    };
    return (
        <>
            <form className="inventory-form">
                <div className="card__wrapper">
                    <div className="card__title">Документ</div>
                    <div className="input__wrapper">
                        <div className="document__number">
                            <TextField
                                label="Номер документа"
                                {...register('documentNumber', { pattern: /^[0-9]*$/ })}
                                type="number"
                            />
                        </div>
                        <div className="document__date">
                            <Calendar
                                label="Дата документа"
                                wrapperName="calendar__wrapper"
                                control={control}
                                name={'choosenDate'}
                            />
                        </div>
                        <div className="document__store">
                            <TextField label="Магазин" {...register('storeName')} />
                        </div>
                    </div>
                </div>
                <div className="card__wrapper">
                    <div className="card__title">Комментарий</div>
                    <div className="input__wrapper">
                        <div className="document__comment">
                            <TextField label="Введите текст" {...register('comment')} />
                        </div>
                    </div>
                </div>
            </form>
            <Button onClick={handleSubmit(onSubmit)}>
                Создать
            </Button>
        </>
    );
};
