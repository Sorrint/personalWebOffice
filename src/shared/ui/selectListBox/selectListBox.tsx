import { type ReactNode, Fragment, useMemo, memo } from 'react';
import { Listbox } from '@headlessui/react';
import './selectListBox.scss';
import { Button } from '../button';

export interface ListBoxItem {
    _id: string | number
    content: ReactNode
    disabled?: boolean
}

interface SelectListBoxProps<T extends string> {
    options?: ListBoxItem[]
    onChange?: (selected: T) => void
    defaultValue?: string
    value?: T
}

export const SelectListBox = memo(<T extends string> (props: SelectListBoxProps<T>) => {
    const { options, onChange, defaultValue, value } = props;
    
    const selectedItem = useMemo(() => {
        return options?.find((option) => option._id === value);
    }, [options, value]);

    return (
        <Listbox 
            onChange={onChange} 
            as='div' 
            value={value} 
            className='selectList'
        >  
            <Listbox.Button 
                as={Button} 
                buttonType='dropdown' 
                className={'selectList__button'}
            >
                {selectedItem?.content ?? defaultValue}
            </Listbox.Button>
            <Listbox.Options 
                className={'selectList__options'}
            >
                {options?.map((option) => (
                    <Listbox.Option 
                        key={option._id} 
                        value={option._id} 
                        as={Fragment} 
                    >
                        {({ active, selected }) => (
                            <li
                                className={`selectList__option${active ? ' selectList__option_active' : ''
                                }${selected ? ' selectList__option_selected' : ''}`}
                            >
                                {option.content}
                            </li>
                        )}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    );
});
