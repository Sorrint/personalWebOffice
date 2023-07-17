import { useState, Fragment} from 'react';
import { Listbox } from '@headlessui/react';
import './selectListBox.scss';
import { Button } from '../button';
import type { RefCallBack } from 'react-hook-form';
const people = [
    { id: 1, name: 'Durward Reynolds', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: true },
    { id: 5, name: 'Katelyn Rohan', unavailable: false }
];

interface ListBoxItem {
    id: string | number
    value: string
    disabled?: boolean
}

interface SelectListBoxProps<T extends ListBoxItem> {
    options: T[]
    selected: T
    onChange?: (selected: T) => void
    name?: string
    ref?: RefCallBack
}

export const SelectListBox = <T extends ListBoxItem>(props: SelectListBoxProps<T>) =>  {
    const {options, selected, onChange, name, ref} = props;
    console.log(selected);
    return (
        <Listbox onChange={onChange} value={selected} name={name} as='div' className='selectList' ref={ref}>
            <Listbox.Button as={Button} buttonType='dropdown' className={'selectList__button'}>
                {selected.value}
            </Listbox.Button>
            <Listbox.Options className={'selectList__options'}>
                {options.map((option) => (
                    <Listbox.Option key={option.id} value={option} as={Fragment} >
                        {({ active, selected }) => (
                            <li
                                className={`selectList__option${
                                    active ? ' selectList__option_active' : ''
                                }${selected ? ' selectList__option_selected' : ''}`}
                            >
                                {option.value}
                            </li>
                        )}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    );
};
