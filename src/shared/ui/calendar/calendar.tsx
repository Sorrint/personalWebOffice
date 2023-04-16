import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FieldValues, Controller, Control, Path } from 'react-hook-form';
import ru from 'date-fns/locale/ru';

import 'react-datepicker/dist/react-datepicker.css';
import './calendar.scss';

registerLocale('ru', ru);

interface ICalendarProps<T extends FieldValues> {
    onChange?: () => void;
    label: string;
    wrapperName: string;
    control: Control<T>;
    name: Path<T>;
}

export default function Calendar<T extends FieldValues>(props: ICalendarProps<T>) {
    const { label, control, name } = props;
    const [startDate, setStartDate] = useState<Date>(new Date());
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <div className="input-container">
                    <DatePicker
                        selected={startDate}
                        onChange={(e) => {
                            setStartDate(e!);
                            field.onChange(e);
                        }}
                        dateFormat="P"
                        locale="ru"
                        id="calendar"
                        className="datepicker"
                        placeholderText={' '}
                    />
                    <div className="cut"></div>
                    <label className="date-placeholder" htmlFor={'datepicker'}>
                        {label}
                    </label>
                </div>
            )}
        />
    );
}
