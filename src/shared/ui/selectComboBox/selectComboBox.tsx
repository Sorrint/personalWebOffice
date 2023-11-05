import { useState, type ForwardedRef, forwardRef } from 'react';
import { Combobox } from '@headlessui/react';
import styles from './selectComboBox.module.scss';
import  { type FieldValues, type Path } from 'react-hook-form';
const people = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan'
];

interface SelectComboBoxProps<T> {
    defaultValue?: string
    options?: string[]
    onChange?: (value: string) => void
    name: Path<T>
}

export const SelectComboBox = forwardRef(function SelectComboBox<T extends FieldValues>(props: SelectComboBoxProps<T>, ref: ForwardedRef<HTMLDivElement>) {

    const { onChange } = props;
    const [selectedPerson] = useState(people[0]);
    const [query, setQuery] = useState('');


    const filteredPeople =
    query === ''
        ? people
        : people.filter((person) => {
            return person.toLowerCase().includes(query.toLowerCase());
        });

    return (
                
        <Combobox as='div' value={selectedPerson} onChange={onChange} ref={ref}>
            <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
            <Combobox.Options as='div' className={styles.options}>
                {filteredPeople.map((person) => (
                    <Combobox.Option key={person} value={person}>
                        {person}
                    </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
    );
});
