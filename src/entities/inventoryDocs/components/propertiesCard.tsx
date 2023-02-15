import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Calendar from '../../../shared/ui/calendar/calendar';
import TextField from '../../../shared/ui/textField/textField';
import './cardStyles.scss';

const PropertiesCard = () => {
    // const [data, setData] = useState<string>('');
    const { register, handleSubmit, control } = useForm({
        mode: 'onChange',
        defaultValues: {
            documentNumber: '',
            storeName: 'Сатурн',
            choosenDate: Date.now(),
            сomment: ''
        }
    });
    const handleChange = () => {
        // console.log(data);
    };

    const onSubmit = <T extends FieldValues>(data: T) => {
        console.log(data);
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
                                onChange={handleChange}
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
                            <TextField label="Введите текст" name="сomment" register={register} />
                        </div>
                    </div>
                </div>
            </form>
            <button onClick={handleSubmit(onSubmit)}>Отправить</button>
        </>
    );
};

export default PropertiesCard;
