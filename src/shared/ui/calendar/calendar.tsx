import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { type FieldValues, Controller, type Control, type Path } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './calendar.module.scss';
import classNames from 'classnames';
import { useAsyncLoad } from '@shared/lib/hooks/';

interface ICalendarProps<T extends FieldValues> {
    onChange?: () => void
    label: string
    wrapperName: string
    control: Control<T>
    name: Path<T>
    full?: boolean
}

function Calendar<T extends FieldValues> (props: ICalendarProps<T>) {

    const { label, control, name, full } = props;
    const [startDate, setStartDate] = useState<Date>(new Date());
    const containerStyles = classNames(styles.container, {
        [styles.full]: full
    })
    const ru = useAsyncLoad('date-fns/locale/ru')
    if (!ru || !ru.default) {
        return null;
    }

    registerLocale('ru', ru.default);
 

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <div className={containerStyles}>
                    <DatePicker
                        selected={startDate}
                        onChange={(e) => {
                            if (e !== null) {
                                setStartDate(e);
                                field.onChange(e);
                            }
                        }}
                        dateFormat="P"
                        locale="ru"
                        id="calendar"
                        className={styles.datepicker}
                        placeholderText={' '}
                    />
                    <label className={styles.placeholder} htmlFor={'calendar'}>
                        {label}
                    </label>
                </div>
            )}
        />
    );
}


export default Calendar