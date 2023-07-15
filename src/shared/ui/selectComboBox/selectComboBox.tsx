import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import './selectComboBox.scss';
import { TextField } from '../textField';
const people = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan'
];

export const SelectComboBox = () => {
    const [selectedPerson, setSelectedPerson] = useState(people[0]);
    const [query, setQuery] = useState('');

    const filteredPeople =
    query === ''
        ? people
        : people.filter((person) => {
            return person.toLowerCase().includes(query.toLowerCase());
        });

    return (
        <Combobox value={selectedPerson} onChange={setSelectedPerson} as='div' className={'combobox'}>
            <Combobox.Input as={TextField} name="gosha" onChange={(event) => { setQuery(event.target.value); }} />
            <Combobox.Options as='div' className={'combobox__options'}>
                {filteredPeople.map((person) => (
                    <Combobox.Option key={person} value={person}>
                        {person}
                    </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
    );
};
