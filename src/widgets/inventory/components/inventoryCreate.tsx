import { FC, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { inventoryDocsAPI } from '../../../entities/inventoryDocs';
import { countersAPI } from '../../../shared/api/countersAPI';
import Calendar from '../../../shared/ui/calendar';
import TextField from '../../../shared/ui/textField';
import './inventoryCreate.scss';

const InventoryCreate: FC = () => {
    const navigate = useNavigate();
    const [createDoc] = inventoryDocsAPI.useCreateNewDocumentMutation();
    const { data } = countersAPI.useGetCounterQuery('docNumber', { refetchOnMountOrArgChange: true });
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
        const res = await createDoc(data);
        navigate(-1);
    };
    return (
        <>
            <form className="inventory-form">
                <div className="card__wrapper">
                    <div className="card__title">Документ</div>
                    <div className="input__wrapper">
                        <div className="document__number">
                            <TextField label="Номер документа" {...register('documentNumber')} />
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
            <button className="create-button" onClick={handleSubmit(onSubmit)}>
                Создать
            </button>
        </>
    );
};

export default InventoryCreate;
