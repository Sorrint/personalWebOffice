import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { type FieldValues, Controller, type Control, type Path } from 'react-hook-form';

import {ru} from '@shared/lib/helpers/transformDate/useDateFNS'
import 'react-datepicker/dist/react-datepicker.css';
import styles from './calendar.module.scss';
import classNames from 'classnames';

registerLocale('ru', ru);

interface ICalendarProps<T extends FieldValues> {
    onChange?: () => void
    label: string
    wrapperName: string
    control: Control<T>
    name: Path<T>
    full?: boolean
}

export async function Calendar<T extends FieldValues> (props: ICalendarProps<T>) {

    const { label, control, name, full } = props;
    const [startDate, setStartDate] = useState<Date>(new Date());

    const containerStyles = classNames(styles.container, {
        [styles.full]: full
    })

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
