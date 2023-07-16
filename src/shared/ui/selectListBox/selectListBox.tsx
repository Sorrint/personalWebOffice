import { useState, Fragment} from 'react';
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

// interface ListBoxItem {
//     id?: string
//     value: string
//     disabled?: boolean
// }

// interface SelectListBoxProps<T extends FieldValues> {
//     options: ListBoxItem[]
//     selected: string
//     onChange?: (selected: string) => void
//     name?: Path<T>
//     setValue?: UseFormSetValue<FieldValues>
// }

export const SelectListBox = () =>  {
    const [currentItem, setCurrentItem] = useState(people[0]);


    return (
        <Listbox onChange={setCurrentItem} value={currentItem} as='div' className='selectList'>
            <Listbox.Button as={Button} buttonType='dropdown' className={'selectList__button'}>
                {currentItem.name}
            </Listbox.Button>
            <Listbox.Options className={'selectList__options'}>
                {people.map((option) => (
                    <Listbox.Option key={option.name} value={option} as={Fragment} >
                        {({ active, selected }) => (
                            <li
                                className={`selectList__option${
                                    active ? ' selectList__option_active' : ''
                                }${selected ? ' selectList__option_selected' : ''}`}
                            >
                                {option.name}
                            </li>
                        )}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    );
};
