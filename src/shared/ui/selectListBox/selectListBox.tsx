import { useState, Fragment } from 'react';
import { Listbox } from '@headlessui/react';
import './selectListBox.scss';
import { Button } from '../button';
const people = [
    { id: 1, name: 'Durward Reynolds', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: true },
    { id: 5, name: 'Katelyn Rohan', unavailable: false }
];

export const SelectListBox = () => {
    const [selectedPerson, setSelectedPerson] = useState(people[0]);

    return (
        <Listbox value={selectedPerson} onChange={setSelectedPerson} as={'div'} className='selectList'>
            <Listbox.Button as={Button} buttonType='dropdown' className={'selectList__button'}>
                {selectedPerson.name}
            </Listbox.Button>
            <Listbox.Options className={'selectList__options'}>
                {people.map((person) => (
                    <Listbox.Option key={person.id} value={person} as={Fragment}>
                        {({ active, selected }) => (
                            <li
                                className={`selectList__option${
                                    selected ? ' selectList__option_selected' : ''
                                }`}
                            >
                                {person.name}
                            </li>
                        )}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    );
};
