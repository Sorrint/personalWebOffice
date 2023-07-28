import { Fragment, useMemo } from 'react';
import { Listbox } from '@headlessui/react';
import './selectListBox.scss';
import { Button } from '../button';


export interface ListBoxItem {
    id?: string | number
    value: string
    disabled?: boolean
}

interface SelectListBoxProps<T extends ListBoxItem> {
    options: T[]
    selected: T
    onChange?: (selected: T) => void
}

export const SelectListBox = <T extends ListBoxItem>(props: SelectListBoxProps<T>) =>  {
    const {options, selected, onChange} = props;
    const selectedItem = useMemo(() => {
        return options?.find((option) => option.value === selected.value);
    }, [options, selected]);
    return (
        <Listbox onChange={onChange} value={selectedItem} as='div' className='selectList' >
            <Listbox.Button as={Button} buttonType='dropdown' className={'selectList__button'}>
                {selectedItem?.value}
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
