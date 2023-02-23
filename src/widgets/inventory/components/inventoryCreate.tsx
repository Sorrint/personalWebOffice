import { FC, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { inventoryDocsAPI } from '../../../entities/inventoryDocs';
import { countersAPI } from '../../../shared/api/countersAPI';
import Calendar from '../../../shared/ui/calendar';
import TextField from '../../../shared/ui/textField';
import './inventoryCreate.scss';
const InventoryCreate: FC = () => {
    const [createDoc] = inventoryDocsAPI.useCreateNewDocumentMutation();
    const { data } = countersAPI.useGetCounterQuery('docNumber');
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
        console.log(res);
    };
    return (
        <>
            <form className="inventory-form">
                <div className="card__wrapper">
                    <div className="card__title">Документ</div>
                    <div className="input__wrapper">
                        <div className="document__number">
                            <TextField label="Номер документа" name="documentNumber" register={register} />
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
                            <TextField label="Магазин" name="storeName" register={register} />
                        </div>
                    </div>
                </div>
                <div className="card__wrapper">
                    <div className="card__title">Комментарий</div>
                    <div className="input__wrapper">
                        <div className="document__comment">
                            <TextField label="Введите текст" name="comment" register={register} />
                        </div>
                    </div>
                </div>
            </form>
            <button onClick={handleSubmit(onSubmit)}>Отправить</button>
        </>
    );
};

export default InventoryCreate;
